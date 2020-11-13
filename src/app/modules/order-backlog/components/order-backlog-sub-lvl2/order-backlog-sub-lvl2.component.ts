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
  selector: 'order-backlog-sub-lvl2',
  templateUrl: './order-backlog-sub-lvl2.component.html',
  styleUrls: ['./order-backlog-sub-lvl2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(swiperight)': 'data.go("plant-stock")',
    '(swipeleft)': 'data.go("production-program")'
  }
})
export class OrderBacklogSubLvl2Component {

  // Retrieve plan date
  @ViewSelectSnapshot(OrderBacklogState.GetPlanDate) plandate$ !: string;

  // Wether or not we are on mobile view
  mobile$: Observable<boolean>;
  // The plant param comming from URL
  plant$: Observable<string>;
  // All rows for the selected plant / zone
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
    // Grab plant parameter from URL
    this.plant$ = this._ac.paramMap.pipe(
      map(params => params.get('plant'))
    );
    // Grab plant and id parameter and use it to get the data
    this.rows$ = this._ac.paramMap.pipe(
      switchMap(params => this._store.select(OrderBacklogState.GetZoneOrPlantRows).pipe(
        map(fn => fn(params.get('plant'), params.get('id')))
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

  goMonth(month: string): void {
    const encoded = encodeURI(month);
    this.data.lastTap = {
      type: 'month',
      key: encoded
    };
    this.router.navigate(['month', encoded], { relativeTo: this._ac });
  }

}
