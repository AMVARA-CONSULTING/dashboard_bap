import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '@services/config.service';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrderBacklogState } from '@store/order-backlog.state';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CustomSelectors } from '@other/custom-selectors';
import { TranslateService } from '@ngx-translate/core';
import { OrderBacklogRouter } from '@modules/order-backlog/services/order-backlog-router.service';

@Component({
  selector: 'order-backlog-sub-lvl2',
  templateUrl: './order-backlog-sub-lvl2.component.html',
  styleUrls: ['./order-backlog-sub-lvl2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(swiperight)': 'data.goFrom("order_backlog", $event)',
    '(swipeleft)': 'data.goFrom("order_backlog", $event)'
  }
})
export class OrderBacklogSubLvl2Component {

  // Retrieve plan date
  @ViewSelectSnapshot(OrderBacklogState.GetPlanDate) plandate$ !: string;

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
    private translate: TranslateService,
    public _obRouter: OrderBacklogRouter
  ) {
    this._title.setTitle(this.config.config.appTitle + ' - ' + this.translate.instant('menu.order_backlog'));
    this.mobile$ = this._breakpoints.observe(Breakpoints.HandsetPortrait).pipe( map(result => result.matches) );
    // Grab all params from URL
    this.params$ = this._ac.paramMap.pipe(
      map(params => params.keys.reduce((r, a) => (r[a] = params.get(a), r), {}))
    );
    // Grab plant and id parameter and use it to get the data
    this.rows$ = this.params$.pipe(
      switchMap(params => this._store.select(CustomSelectors.GetZoneOrPlantRows(params.plant, params.id)))
    );
  }

}
