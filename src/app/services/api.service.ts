import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CookiesExpiredComponent } from 'app/dialogs/cookies-expired/cookies-expired.component';
import * as moment from 'moment';
import { ToolsService } from './tools.service';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { Observable, Subscription, throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { ConfigActions, ConfigState } from '@store/config.state';
import { Config, ReportInfo, ReportTypes } from '@other/interfaces';
import { InterceptorParams } from 'network-error-handling';

@Injectable()
export class ApiService {

  corpintra = false;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private tools: ToolsService,
    private _store: Store
  ) {
    (window as any).api = this;
    this.corpintra = location.hostname.indexOf('corpintra.net') > -1;
  }

  reportDates = {
    orderIntake: '',
    orderBacklog: '',
    productionProgram: '',
    allocation: '',
    plantStock: ''
  };

  reloadDialog: MatDialogRef<CookiesExpiredComponent>;

  authorized = true;

  expectResponse(mime: string) {
    return new InterceptorParams({
      contentChecks: {
        headers: {
          'Content-Type': mime
        },
        shouldMatchContentType: true
      }
    })
  }

  heartbeat: Subscription;

  getSavedReportData(reportKey: ReportTypes): Observable<any[]> {
    this._store.dispatch( new ConfigActions.SetParameter('loading', true) );
    const reportInfo: ReportInfo = this._store.selectSnapshot(ConfigState.GetReportInfo)(reportKey);
    const config = this._store.selectSnapshot<Config>(ConfigState);
    if (this.corpintra || config.corpintra) {
      // Get report from Live Server
      let firstId = '';
      return this.http.get<any>(`${config.apiDomain}${config.apiLink}objects/${reportInfo.id}/versions`, {
        params: this.expectResponse('application/hola'),
        observe: 'response'
      }).pipe(
        catchError(err => {
          // Catch error on getting info from Report ID
          console.log(`${reportKey} - Fail at getting report info.`);
          return throwError(err);
        }),
        switchMap(json => {
          // Get report versions
          firstId = json.body.data[0].id;
          const nextLink = json.body.data[0]._meta.links.outputs.url;
          return this.http.get<any>(config.apiDomain + nextLink, {
            observe: 'response',
            params: this.expectResponse('application/json')
          });
        }),
        catchError(err => {
          // Catch error on getting report versions
          console.log(`${reportKey} - Fail at getting last report versions.`);
          return throwError(err);
        }),
        switchMap(json => {
          // Get last saved report content
          const csv = json.body.data.find(item => item.format === 'CSV');
          const html = json.body.data.find(item => item.format === 'HTML');
          if (html && html._meta.links.content.mimeType) {
            // Report has mimeType of type HTML
            const nextLink = html._meta.links.content.url;
            this.reportDates[reportKey] = html.modificationTime;
            return this.http.get(config.apiDomain + nextLink, {
              responseType: 'text',
              observe: 'response',
              params: this.expectResponse('/html'),
            });
          } else if (csv && csv._meta.links.content.mimeType) {
            // Report has mimeType of type CSV
            const nextLink = csv._meta.links.content.url;
            this.reportDates[reportKey] = csv.modificationTime;
            return this.http.get(config.apiDomain + nextLink, {
              responseType: 'text',
              observe: 'response',
              params: this.expectResponse('/csv')
            });
          } else {
            // Report doesn't have mimeType, it means we have to use second way of get it
            return this.http.get<any>(`${config.apiDomain}${config.apiLink}objects/${firstId}/items`, {
              observe: 'response',
              params: this.expectResponse('application/json')
            }).pipe(
              catchError(err => {
                // Catch error on getting first items
                console.log(`${reportKey} - Fail at getting first items`);
                return throwError(err);
              }),
              switchMap(data => this.http.get<any>(`${config.apiDomain}${config.apiLink}objects/${data.body.data[0].id}/items`, {
                observe: 'response',
                params: this.expectResponse('application/json')
              })),
              catchError(err => {
                // Catch error on getting second items
                console.log(`${reportKey} - Fail at getting second items`);
                return throwError(err);
              }),
              switchMap(data => this.http.get(`${config.apiDomain}${config.apiLink}disp/repository/sid/cm/oid/${data.body.data[0].id}/content`, {
                observe: 'response',
                responseType: 'text'
              }))
            );
          }
        }),
        catchError(err => {
          // Catch error on getting HTML content
          console.log(`${reportKey} - Fail at getting report table data`);
          return err;
        }),
        finalize(() => {
          this._store.dispatch( new ConfigActions.SetParameter('loading', false) );
        }),
        map((response: HttpResponse<any>) => {
          // Convert HTML / CSV to JSON and formatting
          // MIME Type can be either text/html or application/csv
          const mimeType = response.headers.get('Content-Type').split(';')[0].trim();
          let columns = [];
          try {
            columns = config.reports[config.target].columns[reportKey].shouldBeNumber;
          } catch (err) { }
          // MIME Type can be either text/html or application/csv
          let rows = [];
          switch (mimeType) {
            case 'text/html':
              rows = this.tools.htmlToJson(response.body, `[lid=${reportInfo.selector}] tr`);
              break;
            case 'application/csv':
              if (reportKey === ReportTypes.OrderBacklog) {
                rows = this.tools.csvToJsonNamed(response.body);
              } else {
                rows = this.tools.csvToJson(response.body, columns);
              }
              break;
            default:
          }
          // Convert fields to numbers
          if (columns.length > 0) {
            rows = rows.map(row => {
              columns.forEach(num => {
                row[num] = isNaN(row[num]) ? 0 : parseFloat(row[num]);
              });
              return row;
            });
          }
          return rows;
        })
      );
    } else {
      // Get report from local
      return this.http.get<any[]>(`assets/reports/${reportInfo.fallback}`, {
        observe: 'response',
        params: this.expectResponse('application/json')
      }).pipe(
        finalize(() => {
          this._store.dispatch( new ConfigActions.SetParameter('loading', false) );
        }),
        tap(_ => this.reportDates[reportKey] = moment().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')),
        map(res => res.body)
      );
    }
  }
}
