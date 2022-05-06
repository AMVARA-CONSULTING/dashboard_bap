import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { classifyByProperty } from '@other/functions';
import { IntakeHistoryColumns, ReportState, ReportTypes, Zones } from '@other/interfaces';
import { ApiService } from '@services/api.service';
import * as moment from 'moment';
import { delay, tap } from 'rxjs/operators';

export namespace OrderIntakeHistory {

  export class Get {
    static readonly type = '[Order Intake History] Get';
  }
  
  export class SetShowTotal {
    constructor(public total: boolean) { }
    static readonly type = '[Order Intake History] Set Show Total';
  }

}

/**
 * Order Intake History State
 * Here will go all rows of Order Backlog Report
 */
@State<ReportState>({
  name: 'order_intake_history',
  defaults: {
    rows: [],
    plandate: '',
    latestDay: '',
    previousDay: '',
    actualDateRange: [],
    previousDateRange: [],
    showTotal: localStorage.getItem('intake_history_show_total') == "true"
  }
})
@Injectable()
export class OrderIntakeHistoryState {

  constructor(
    private _api: ApiService
  ) { }

  @Action(OrderIntakeHistory.Get)
  get({ patchState }: StateContext<ReportState>) {
    return this._api.getSavedReportData(ReportTypes.OrderIntakeHistory).pipe(
      tap(rows => {
        // Get months available
        const monthsAvailable = Object.keys(rows.reduce((r, a) => {
          const month = a[IntakeHistoryColumns.Date];
          r[month] = r[month] || '.';
          return r;
        }, {}));
        // Sort months in descending order (from newer to older)
        monthsAvailable.sort((a, b) => parseInt(b) - parseInt(a));
        // Get latest day available
        const latestDay = [ ...rows ].sort((a, b) => b[IntakeHistoryColumns.Date] - a[IntakeHistoryColumns.Date])[0][IntakeHistoryColumns.Date];
        // Get last day available of previous month
        const previousDays = rows
                            .filter(row => row[IntakeHistoryColumns.Date] == moment(latestDay, 'YYYYMM').subtract(1, 'years').format('YYYYMM'))
                            .sort((a, b) => b[IntakeHistoryColumns.Date] - a[IntakeHistoryColumns.Date])
        const previousDay = previousDays.length > 0 ? previousDays[0][IntakeHistoryColumns.Date] : '0';
        // Get months of current date range
        const actualDates = monthsAvailable.slice(0, 12);
        // Get months of previous date range
        const previousDates = monthsAvailable.slice(12, 24);
        patchState({
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

  // set Show total value
  @Action(OrderIntakeHistory.SetShowTotal)
  setShowTotal({ patchState }: StateContext<ReportState>, {total}: OrderIntakeHistory.SetShowTotal) {
    patchState({
      showTotal: total
    })
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
    const vals = classifyByProperty(ctx.rows, IntakeHistoryColumns.SortKey_PlantGroup);
    return vals;
  }

  // Get rows classified by Datum
  @Selector()
  static GetDates(ctx: ReportState) {
    return classifyByProperty(ctx.rows, IntakeHistoryColumns.Date);
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

  // get total or avg
  @Selector()
  static GetShowTotal(ctx: ReportState) {
    return ctx.showTotal;
  }

}
