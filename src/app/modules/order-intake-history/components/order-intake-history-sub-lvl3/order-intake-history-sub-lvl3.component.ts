import { DataService } from '@services/data.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '@services/config.service';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { CustomSelectors } from '@other/custom-selectors';
import { OrderIntakeHistoryState } from '@store/order-intake-history.state';
import { OrderIntakeHistoryRouter } from '@modules/order-intake-history/services/order-intake-history-router.service';

@Component({
  selector: 'order-intake-history-sub-lvl3',
  templateUrl: './order-intake-history-sub-lvl3.component.html',
  styleUrls: ['./order-intake-history-sub-lvl3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(swiperight)': '_obRouter.goToPlantZoneView(_ac)'
  }
})
export class OrderIntakeHistorySubLvl3Component {

  // Retrieve plan date
  @ViewSelectSnapshot(OrderIntakeHistoryState.GetPlanDate) plandate$ !: string;

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
    public _obRouter: OrderIntakeHistoryRouter
  ) {
    this._title.setTitle(this.config.config.appTitle + ' - Ecommerce evolution');
    // Grab all params from URL
    this.params$ = this._ac.paramMap.pipe(
      map(params => params.keys.reduce((r, a) => (r[a] = params.get(a), r), {}))
    );
    this.plantOrZoneRows$ = this.params$.pipe(
      switchMap(params => this._store.select(CustomSelectors.GetZoneOrPlantRows(params.plant, params.id, 'order_intake_history')))
    );
    // Grab plant, id and month parameter and use it to get the current month data
    this.rows$ = this.params$.pipe(
      switchMap(params => this._store.select(CustomSelectors.GetMonthRows(params.plant, params.id, params.month, 'order_intake_history')))
    );
  }

}
