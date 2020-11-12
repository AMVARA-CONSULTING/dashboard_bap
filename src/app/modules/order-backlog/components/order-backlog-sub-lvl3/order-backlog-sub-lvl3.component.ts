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

@Component({
  selector: 'order-backlog-sub-lvl3',
  templateUrl: './order-backlog-sub-lvl3.component.html',
  styleUrls: ['./order-backlog-sub-lvl3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(swiperight)': 'data.go("plant-stock")',
    '(swipeleft)': 'data.go("production-program")'
  }
})
export class OrderBacklogSubLvl3Component {

  // Retrieve plan date
  @ViewSelectSnapshot(OrderBacklogState.GetPlanDate) plandate$ !: string;

  // Wether or not we are on mobile view
  mobile$: Observable<boolean>;
  // Rows used for higher totals
  plantOrZoneRows$: Observable<any[]>;
  // The type param comming from URL
  type$: Observable<string>;
  // The type param comming from URL
  month$: Observable<string>;
  // All rows for the selected plant / zone and month
  rows$: Observable<any[]>;

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
    // Grab month parameter from URL
    this.month$ = this._ac.paramMap.pipe(
      map(params => params.get('month'))
    );
    // Grab type parameter from URL
    this.type$ = this._ac.paramMap.pipe(
      map(params => params.get('type'))
    );
    // Grab type and id parameter and use it to get the total rows
    this.plantOrZoneRows$ = this._ac.paramMap.pipe(
      switchMap(params => this._store.select(OrderBacklogState.GetZoneOrPlantRows).pipe(
        map(fn => fn(params.get('type'), params.get('id')))
      ))
    );
    // Grab type, id and month parameter and use it to get the current month data
    this.rows$ = this._ac.paramMap.pipe(
      switchMap(params => this._store.select(OrderBacklogState.GetMonthRows).pipe(
        map(fn => fn(params.get('type'), params.get('id'), params.get('month')))
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

  goRegion(region: string): void {
    const encoded = encodeURI(region);
    this.data.lastTap = {
      type: 'region',
      key: encoded
    };
    this.router.navigate(['region', encoded], { relativeTo: this._ac });
  }

  goProduct(product: string): void {
    const encoded = encodeURI(product);
    this.data.lastTap = {
      type: 'product',
      key: encoded
    };
    this.router.navigate(['product', encoded], { relativeTo: this._ac });
  }


}
