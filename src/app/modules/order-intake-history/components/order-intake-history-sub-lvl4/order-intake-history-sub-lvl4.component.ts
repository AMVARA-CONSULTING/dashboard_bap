import { DataService } from '@services/data.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '@services/config.service';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GetPreviousMonth } from '@other/functions';
import { RegionOrProduct } from '@other/interfaces';
import { CustomSelectors } from '@other/custom-selectors';
import { OrderIntakeHistoryState } from '@store/order-intake-history.state';
import { OrderIntakeHistoryRouter } from '@modules/order-intake-history/services/order-intake-history-router.service';

@Component({
  selector: 'order-intake-history-sub-lvl4',
  templateUrl: './order-intake-history-sub-lvl4.component.html',
  styleUrls: ['./order-intake-history-sub-lvl4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(swiperight)': '_obRouter.goToMonthView(_ac)'
  }
})
export class OrderIntakeHistorySubLvl4Component {

  // Retrieve plan date
  @ViewSelectSnapshot(OrderIntakeHistoryState.GetPlanDate) plandate$ !: string;

  // Wether or not we are on mobile view
  mobile$: Observable<boolean>;
  // Rows used for highest total
  plantOrZoneRows$: Observable<any[]>;
  // Rows used for month total
  monthRows$: Observable<any[]>;
  // Rows used for month previous total
  previousMonthRows$: Observable<any[]>;
  // All params comming from URL
  params$: Observable<any>;
  // All rows for the selected plant / zone and month
  rows$: Observable<any[]>;
  // All rows for the selected plant / zone and previous month
  previousRows$: Observable<any[]>;

  constructor(
    public _ac: ActivatedRoute,
    private config: ConfigService,
    private _title: Title,
    private _store: Store,
    private _breakpoints: BreakpointObserver,
    public _obRouter: OrderIntakeHistoryRouter,
    public _data: DataService
  ) {
    this._title.setTitle(this.config.config.appTitle + 'Ecommerce evolution');
    this.mobile$ = this._breakpoints.observe(Breakpoints.HandsetPortrait).pipe( map(result => result.matches) );
    // Grab all params from URL
    this.params$ = this._ac.paramMap.pipe(
      map(params => params.keys.reduce((r, a) => (r[a] = params.get(a), r), {}))
    );
    // Get the total plant rows
    this.plantOrZoneRows$ = this.params$.pipe(
      switchMap(params => this._store.select(CustomSelectors.GetZoneOrPlantRows(params.plant, params.id, 'order_intake_history')))
    );
    // Get the total month rows
    this.monthRows$ = this.params$.pipe(
      switchMap(params => this._store.select(CustomSelectors.GetMonthRows(params.plant, params.id, params.month, 'order_intake_history')))
    );
    // Get the total previous month rows
    this.previousMonthRows$ = this.params$.pipe(
      switchMap(params => this._store.select(CustomSelectors.GetMonthRows(params.plant, params.id, GetPreviousMonth(params.month), 'order_intake_history')))
    );
    // Get the the rows for the current selected region or product
    this.rows$ = this.params$.pipe(
      // tslint:disable-next-line: max-line-length
      switchMap(params => this._store.select(CustomSelectors.GetRegionOrProductRows(params.plant, params.id, params.month, params.type, params.value, 'order_intake_history')))
    );
    // Get the the rows for the previous selected region or product
    this.previousRows$ = this.params$.pipe(
      // tslint:disable-next-line: max-line-length
      switchMap(params => this._store.select(CustomSelectors.GetRegionOrProductRows(params.plant, params.id, GetPreviousMonth(params.month), params.type, params.value, 'order_intake_history')))
    );
  }

  goItem(type: RegionOrProduct, item: string): void {
    this._obRouter.goToProductRegionView(this._ac, null, null, null, type, item);
  }

}
