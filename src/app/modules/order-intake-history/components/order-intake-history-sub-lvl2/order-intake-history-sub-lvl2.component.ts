import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '@services/config.service';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CustomSelectors } from '@other/custom-selectors';
import { OrderIntakeHistoryRouter } from '@modules/order-intake-history/services/order-intake-history-router.service';
import { OrderIntakeHistoryState } from '@store/order-intake-history.state';

@Component({
  selector: 'order-intake-history-sub-lvl2',
  templateUrl: './order-intake-history-sub-lvl2.component.html',
  styleUrls: ['./order-intake-history-sub-lvl2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(swiperight)': '_obRouter.goToMainView()'
  }
})
export class OrderIntakeHistorySubLvl2Component {

  // Retrieve plan date
  @ViewSelectSnapshot(OrderIntakeHistoryState.GetPlanDate) plandate$ !: string;

  // Wether or not we are on mobile view
  mobile$: Observable<boolean>;
  // All params comming from URL
  params$: Observable<any>;
  // All rows for the selected plant / zone
  rows$: Observable<any[]>;

  constructor(
    public _ac: ActivatedRoute,
    private config: ConfigService,
    private _title: Title,
    private _store: Store,
    private _breakpoints: BreakpointObserver,
    public _obRouter: OrderIntakeHistoryRouter
  ) {
    this._title.setTitle(this.config.config.appTitle + ' - Ecommerce evolution');
    this.mobile$ = this._breakpoints.observe(Breakpoints.HandsetPortrait).pipe( map(result => result.matches) );
    // Grab all params from URL
    this.params$ = this._ac.paramMap.pipe(
      map(params => params.keys.reduce((r, a) => (r[a] = params.get(a), r), {}))
    );
    // Grab plant and id parameter and use it to get the data
    this.rows$ = this.params$.pipe(
      switchMap(params => this._store.select(CustomSelectors.GetZoneOrPlantRows(params.plant, params.id, this._ac.snapshot.data.title)))
    );
  }

}
