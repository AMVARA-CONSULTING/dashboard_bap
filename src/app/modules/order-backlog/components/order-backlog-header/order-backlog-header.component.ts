import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DistinctMonthsFn } from '@modules/order-backlog/pipes/distinct-months.pipe';
import { FilterYearFn } from '@modules/order-backlog/pipes/filter-year.pipe';
import { SelectSnapshot, ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Store } from '@ngxs/store';
import { CustomSelectors } from '@other/custom-selectors';
import { BacklogColumns, DateRanges, OrderBacklogDays } from '@other/interfaces';
import { DataService } from '@services/data.service';
import { OrderBacklogState } from '@store/order-backlog.state';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'order-backlog-header',
  templateUrl: './order-backlog-header.component.html',
  styleUrls: ['./order-backlog-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderBacklogHeaderComponent {

  @SelectSnapshot(OrderBacklogState.GetDateRanges) ranges !: DateRanges;

  @ViewSelectSnapshot(OrderBacklogState.GetLatestAndPreviousDay) days$ !: OrderBacklogDays;

  currentMonthDate$: Observable<string>;

  level: number;

  @HostBinding('class') get themeClass() {
    return `level${this.level}`;
  };

  currentMonth = moment().format('YYYY-MM');

  params$: Observable<any>;

  constructor(
    public _data: DataService,
    private _ac: ActivatedRoute,
    private _store: Store
  ) {
    this.level = this._ac.snapshot.data.level;
    // Grab all params from URL
    this.params$ = this._ac.paramMap
    .pipe(
      map(params => params.keys.reduce((r, a) => (r[a] = params.get(a), r), {} as any))
    );
    this.currentMonthDate$ = this.params$.pipe(
      switchMap(params => this._store.select<any[]>(CustomSelectors.GetZoneOrPlantRows(params.plant, params.id)).pipe(
        map(rows => ([params, rows]))
      )),
      map(([params, rows]) => {
        rows = FilterYearFn(rows, 'current', this.ranges);
        rows = DistinctMonthsFn(rows);
        rows = rows[params.month];
        return rows[0][BacklogColumns.Date];
      })
    );
  }

}
