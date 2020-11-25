import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { classifyByProperty } from '@other/functions';
import { BacklogColumns, ReportState, ReportTypes, Zones } from '@other/interfaces';
import { ApiService } from '@services/api.service';
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
    latestDay: '',
    previousDay: '',
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
        // Get latest day available
        const latestDay = [ ...rows ].sort((a, b) => moment(b[BacklogColumns.Date], 'YYYY-MM-DD').valueOf() - moment(a[BacklogColumns.Date], 'YYYY-MM-DD').valueOf())[0][BacklogColumns.Date];
        // Get last day available of previous month
        const previousDay = rows
                            .filter(row => row[BacklogColumns.Date].substring(0, 7) === moment(latestDay, 'YYYY-MM-DD').subtract(1, 'years').format('YYYY-MM'))
                            .sort((a, b) => moment(b[BacklogColumns.Date], 'YYYY-MM-DD').valueOf() - moment(a[BacklogColumns.Date], 'YYYY-MM-DD').valueOf())[0][BacklogColumns.Date];
        // Get months of current date range
        const actualDates = monthsAvailable.slice(0, 12);
        // Get months of previous date range
        const previousDates = monthsAvailable.slice(12, 24);
        setState({
          rows: rows,
          plandate: this._api.reportDates.orderBacklog,
          latestDay: latestDay,
          previousDay: previousDay,
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

  // Get latest day
  @Selector()
  static GetLatestAndPreviousDay(ctx: ReportState) {
    return {
      latestDay: ctx.latestDay,
      previousDay: ctx.previousDay
    };
  }

}
