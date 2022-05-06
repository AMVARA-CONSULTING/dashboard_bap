import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { finalize, map, tap } from 'rxjs/operators';
import { Observable, Subscription} from 'rxjs';
import { Store } from '@ngxs/store';
import { ConfigActions, ConfigState } from '@store/config.state';
import { Config, ReportInfo, ReportTypes } from '@other/interfaces';
import { InterceptorParams } from 'ngx-network-error';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private _store: Store
  ) {
    (window as any).api = this;
  }

  reportDates = {
    orderIntake: '',
    orderBacklog: '',
    productionProgram: '',
    allocation: '',
    plantStock: '',
    orderIntakeHistory: ''
  };

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
    console.log("request for report from:", reportKey)
    // Enable loading
    this._store.dispatch( new ConfigActions.SetParameter('loading', true) );
    const reportInfo: ReportInfo = this._store.selectSnapshot(ConfigState.GetReportInfo)(reportKey);
    const config = this._store.selectSnapshot<Config>(ConfigState);
    // Get report from local
    return this.http.get<any[]>(`assets/reports/${reportInfo.fallback}`, {
      observe: 'response',
      params: this.expectResponse('application/json')
    }).pipe(
      // Disable loading on finish
      finalize(() => {
        this._store.dispatch( new ConfigActions.SetParameter('loading', false) );
      }),
      // Set current date
      tap(_ => this.reportDates[reportKey] = moment().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')),
      map(res => res.body),
      map(json => {
        // Report Allocation: Modify date values with current year
        // Allocation requires dates with current year to function properly
        if (reportKey === 'allocation') {
          // Grab necessary keys
          const datumKey = config.reports[config.target].columns[reportKey].datum;
          const yearMonthKey = config.reports[config.target].columns[reportKey].yearMonth;
          const runDate = config.reports[config.target].columns[reportKey].runDate;
          const currentYear = new Date().getFullYear().toString();
          for (let i = 0; i < json.length; i++) {
            // Parse dates, set current year and reformat to date fields
            json[i][datumKey] = currentYear + json[i][datumKey].slice(4)
            json[i][yearMonthKey] = currentYear + json[i][yearMonthKey].slice(4)
            json[i][runDate] = currentYear + json[i][runDate].slice(4)
          }
        }
        return json;
      })
    );
    }
}