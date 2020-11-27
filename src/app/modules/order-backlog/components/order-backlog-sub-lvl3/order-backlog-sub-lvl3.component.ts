import { DataService } from '@services/data.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '@services/config.service';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrderBacklogState } from '@store/order-backlog.state';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { CustomSelectors } from '@other/custom-selectors';
import { OrderBacklogRouter } from '@modules/order-backlog/services/order-backlog-router.service';

@Component({
  selector: 'order-backlog-sub-lvl3',
  templateUrl: './order-backlog-sub-lvl3.component.html',
  styleUrls: ['./order-backlog-sub-lvl3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(swiperight)': 'data.goFrom("order_backlog", $event)',
    '(swipeleft)': 'data.goFrom("order_backlog", $event)'
  }
})
export class OrderBacklogSubLvl3Component {

  // Retrieve plan date
  @ViewSelectSnapshot(OrderBacklogState.GetPlanDate) plandate$ !: string;

  // Rows used for higher totals
  plantOrZoneRows$: Observable<any[]>;
  // All params comming from URL
  params$: Observable<any>;
  // All rows for the selected plant / zone and month
  rows$: Observable<any[]>;

  constructor(
    public _ac: ActivatedRoute,
    public _data: DataService,
    private config: ConfigService,
    private _title: Title,
    private _store: Store,
    public _obRouter: OrderBacklogRouter
  ) {
    this._title.setTitle(this.config.config.appTitle + ' - Order Backlog');
    // Grab all params from URL
    this.params$ = this._ac.paramMap.pipe(
      map(params => params.keys.reduce((r, a) => (r[a] = params.get(a), r), {}))
    );
    this.plantOrZoneRows$ = this.params$.pipe(
      switchMap(params => this._store.select(CustomSelectors.GetZoneOrPlantRows(params.plant, params.id)))
    );
    // Grab plant, id and month parameter and use it to get the current month data
    this.rows$ = this.params$.pipe(
      switchMap(params => this._store.select(CustomSelectors.GetMonthRows(params.plant, params.id, params.month)))
    );
  }

}
