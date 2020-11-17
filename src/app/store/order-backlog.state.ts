import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { classifyByProperty } from '@other/functions';
import { BacklogColumns, ReportState, ReportTypes, Zones } from '@other/interfaces';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';

export namespace OrderBacklog {

  export class Get {
    static readonly type = '[Order Backlog] Get';
  }

}

/**
 * Order Backlog State
 * Here will go all rows of Order Backlog Report
 */
@State<ReportState>({
  name: 'order_backlog',
  defaults: {
    rows: [],
    plandate: '',
    actualDateRange: [],
    previousDateRange: []
  }
})
@Injectable()
export class OrderBacklogState {

  constructor(
    private _api: ApiService
  ) { }

  @Action(OrderBacklog.Get)
  get({ setState }: StateContext<ReportState>) {
    return this._api.getSavedReportData(ReportTypes.OrderBacklog).pipe(
      tap(rows => {
        // Get months available
        const monthsAvailable = Object.keys(rows.reduce((r, a) => {
          const month = moment(a[BacklogColumns.Date], 'YYYY-MM-DD').format('YYYY-MM');
          r[month] = r[month] || '.';
          return r;
        }, {}));
        // Sort months in descending order (from newer to older)
        monthsAvailable.sort((a, b) => moment(b, 'YYYY-MM').valueOf() - moment(a, 'YYYY-MM').valueOf());
        // Get months of current date range
        const actualDates = monthsAvailable.slice(0, 12);
        // Get months of previous date range
        const previousDates = monthsAvailable.slice(12, 24);
        // Scramble data
        /* const scramblers = [
          {
            column: BacklogColumns.ProductEnglish,
            language: 'en',
            value: 'commerce.productName()'
          },
          {
            column: BacklogColumns.ProductDeutsch,
            language: 'de',
            value: 'commerce.productName()'
          },
          {
            column: BacklogColumns.RegionEnglish,
            language: 'en',
            value: 'address.city()'
          },
          {
            column: BacklogColumns.RegionDeutsch,
            language: 'de',
            value: 'address.city()'
          }
        ];
        const fakerCopy = faker;
        scramblers.forEach(scrambler => {
          const column = scrambler.column;
          faker.locale = scrambler.language;
          Object.keys(data.rows.reduce((r, a) => {
            r[a[column]] = r[a[column]] || [];
            r[a[column]].push(a);
            return r;
          }, {}))
          .map(product => ({ orig: product, scrambled: eval(`fakerCopy.${scrambler.value}`) }))
          .forEach(t => {
            data.rows = data.rows.map(row => {
              if (row[column] === t.orig) {
                row[column] = t.scrambled;
              }
              return row;
            });
          });
        });
        let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(JSON.stringify(data.rows));
        let exportFileDefaultName = 'Backlog.json';
        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        console.log(data.rows); */
        setState({
          rows: rows,
          plandate: '',
          actualDateRange: actualDates,
          previousDateRange: previousDates
        });
      })
    );
  }

  // Retrieves actual and previous date ranges
  @Selector()
  static GetDateRanges(ctx: ReportState) {
    return {
      actual: ctx.actualDateRange,
      previous: ctx.previousDateRange
    };
  }

  // Get rows classified by ZoneID
  @Selector()
  static GetUniqueZones(ctx: ReportState): Zones {
    return classifyByProperty(ctx.rows, BacklogColumns.SortKey_PlantGroup);
  }

  // Get rows classified by Datum
  @Selector()
  static GetDates(ctx: ReportState) {
    return classifyByProperty(ctx.rows, BacklogColumns.Date);
  }

  // Get plandate extracted from XHR
  @Selector()
  static GetPlanDate(ctx: ReportState) {
    return ctx.plandate;
  }

}
