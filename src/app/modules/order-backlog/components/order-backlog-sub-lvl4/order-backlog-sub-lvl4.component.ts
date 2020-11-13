import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@services/data.service';
import { ConfigService } from '@services/config.service';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrderBacklogState } from '@store/order-backlog.state';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import * as moment from 'moment';
import { GetPreviousMonth } from '@other/functions';
import { RegionOrProduct } from '@other/interfaces';

@Component({
  selector: 'order-backlog-sub-lvl4',
  templateUrl: './order-backlog-sub-lvl4.component.html',
  styleUrls: ['./order-backlog-sub-lvl4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(swiperight)': 'data.go("plant-stock")',
    '(swipeleft)': 'data.go("production-program")'
  }
})
export class OrderBacklogSubLvl4Component {

  // Retrieve plan date
  @ViewSelectSnapshot(OrderBacklogState.GetPlanDate) plandate$ !: string;

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
    private _ac: ActivatedRoute,
    private data: DataService,
    private config: ConfigService,
    private router: Router,
    private _title: Title,
    private _store: Store,
    private _breakpoints: BreakpointObserver
  ) {
    this._title.setTitle(this.config.config.appTitle + ' - Order Backlog');
    this.mobile$ = this._breakpoints.observe(Breakpoints.HandsetPortrait).pipe( map(result => result.matches) );
    // Grab all params from URL
    this.params$ = this._ac.paramMap.pipe(
      map(params => params.keys.reduce((r, a) => (r[a] = params.get(a), r), {}))
    );
    // Get the total plant rows
    this.plantOrZoneRows$ = this.params$.pipe(
      switchMap(params => this._store.select(OrderBacklogState.GetZoneOrPlantRows).pipe(
        map(fn => fn(params.plant, params.id))
      ))
    );
    // Get the total month rows
    this.monthRows$ = this.params$.pipe(
      switchMap(params => this._store.select(OrderBacklogState.GetMonthRows).pipe(
        map(fn => fn(params.plant, params.id, params.month))
      ))
    );
    // Get the total previous month rows
    this.previousMonthRows$ = this.params$.pipe(
      switchMap(params => this._store.select(OrderBacklogState.GetMonthRows).pipe(
        map(fn => fn(params.plant, params.id, GetPreviousMonth(params.month)))
      ))
    );
    // Get the the rows for the current selected region or product
    this.rows$ = this.params$.pipe(
      switchMap(params => this._store.select(OrderBacklogState.GetRegionOrProductRows).pipe(
        map(fn => fn(params.plant, params.id, params.month, params.type, params.value))
      ))
    );
    // Get the the rows for the previous selected region or product
    this.previousRows$ = this.params$.pipe(
      switchMap(params => this._store.select(OrderBacklogState.GetRegionOrProductRows).pipe(
        map(fn => fn(params.plant, params.id, GetPreviousMonth(params.month), params.type, params.value))
      ))
    );
  }

  return(): void {
    this.router.navigate(['../../'], { relativeTo: this._ac });
  }

  forward(): void {
    if (this.data.lastTap2) {
      if (this.data.lastTap2.type === 'region') {
        this.router.navigate(['region', this.data.lastTap2.key], { relativeTo: this._ac, replaceUrl: true });
      } else {
        this.router.navigate(['product', this.data.lastTap2.key], { relativeTo: this._ac, replaceUrl: true });
      }
    }
  }

  goItem(type: RegionOrProduct, item: string): void {
    this.data.lastTap = {
      type: type,
      key: item
    };
    this.router.navigate(['../../', type, item], { relativeTo: this._ac });
  }

}
