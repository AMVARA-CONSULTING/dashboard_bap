import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { classifyByProperty } from '@other/functions';
import { BacklogColumns, ReportState, Zones } from '@other/interfaces';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
import * as moment from 'moment';
import { tap } from 'rxjs/internal/operators/tap';

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
    private _api: ApiService,
    private _config: ConfigService
  ) { }

  @Action(OrderBacklog.Get)
  get({ setState }: StateContext<ReportState>) {
    return this._api.getOrderBacklogData(this._config.config.reports[this._config.config.target][this._config.config.scenario].orderBacklog).pipe(
      tap(data => {
        // Get months available
        const monthsAvailable = Object.keys(data.rows.reduce((r, a) => {
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
        setState({
          rows: data.rows,
          plandate: data.plandate,
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

  // Get all rows for a selected zone or plant
  @Selector()
  static GetZoneOrPlantRows(ctx: ReportState) {
    return (type: 'plant' | 'zone' | string, value: string) => {
      let rows = [];
      if (type === 'zone') {
        rows = classifyByProperty(ctx.rows, BacklogColumns.SortKey_PlantGroup)[value];
      } else {
        rows = classifyByProperty(ctx.rows, BacklogColumns.SortKey_Plant)[value];
      }
      return rows;
    };
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
