import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { classifyByProperty } from '@other/functions';
import { BacklogColumns, ReportState, Zones } from '@other/interfaces';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
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
    plandate: ''
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
      tap(data => setState(data))
    );
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
