import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CookiesExpiredComponent } from 'app/dialogs/cookies-expired/cookies-expired.component';
import * as moment from 'moment';
import { ToolsService } from './tools.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable, Subscription, throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { ConfigState } from '@store/config.state';
import { Config, ReportInfo, ReportTypes } from '@other/interfaces';

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

  openCookiesPopup() {
    if (!this.reloadDialog) {
      this.reloadDialog = this.dialog.open(CookiesExpiredComponent, {
        panelClass: 'newUpdate',
        disableClose: true,
        closeOnNavigation: false
      });
    }
  }

  authorized = true;

  heartbeat: Subscription;

  getSavedReportData(reportKey: ReportTypes): Observable<any[]> {
    const reportInfo: ReportInfo = this._store.selectSnapshot(ConfigState.GetReportInfo)(reportKey);
    const config = this._store.selectSnapshot<Config>(ConfigState);
    if (this.corpintra || config.corpintra) {
      // Get report from Live Server
      let firstId = '';
      return this.http.get<any>(`${config.apiDomain}${config.apiLink}objects/${reportInfo.id}/versions`).pipe(
        catchError(err => {
          // Catch error on getting info from Report ID
          console.log(`${reportKey} - Fail at getting report info.`);
          return throwError(err);
        }),
        switchMap(json => {
          // Get report versions
          firstId = json.data[0].id;
          const nextLink = json.data[0]._meta.links.outputs.url;
          return this.http.get<any>(config.apiDomain + nextLink);
        }),
        catchError(err => {
          // Catch error on getting report versions
          console.log(`${reportKey} - Fail at getting last report versions.`);
          return throwError(err);
        }),
        switchMap(json => {
          // Get last saved report content
          const mimeType = json.data.find(item => item.format === 'HTML')._meta.links.content.mimeType;
          if (mimeType) {
            // Report has mimeType
            const nextLink = json.data.find(item => item.format === 'HTML')._meta.links.content.url;
            this.reportDates[reportKey] = json.data.find(item => item.format === 'HTML').modificationTime;
            return this.http.get(config.apiDomain + nextLink, { responseType: 'text' });
          } else {
            // Report doesn't have mimeType, it means we have to use second way of get it
            return this.http.get<any>(`${config.apiDomain}${config.apiLink}objects/${firstId}/items`).pipe(
              catchError(err => {
                // Catch error on getting first items
                console.log(`${reportKey} - Fail at getting first items`);
                return throwError(err);
              }),
              switchMap(data => this.http.get<any>(`${config.apiDomain}${config.apiLink}objects/${data.data[0].id}/items`)),
              catchError(err => {
                // Catch error on getting second items
                console.log(`${reportKey} - Fail at getting second items`);
                return throwError(err);
              }),
              switchMap(data => this.http.get(`${config.apiDomain}${config.apiLink}disp/repository/sid/cm/oid/${data.data[0].id}/content`, { responseType: 'text' }))
            );
          }
        }),
        catchError(err => {
          // Catch error on getting HTML content
          console.log(`${reportKey} - Fail at getting report table data`);
          return err;
        }),
        map(html => {
          // Convert HTML to JSON and formatting
          let columns = [];
          try {
            columns = config.reports[config.target].columns[reportKey].shouldBeNumber;
          } catch (err) { }
          let rows = this.tools.htmlToJson(html, `[lid=${reportInfo.selector}] tr`);
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
      return this.http.get<any[]>(`assets/reports/${reportInfo.fallback}`).pipe(
        tap(_ => this.reportDates[reportKey] = moment().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'))
      );
    }
  }
}
