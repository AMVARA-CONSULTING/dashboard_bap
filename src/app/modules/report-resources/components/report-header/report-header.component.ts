import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DistinctMonthsFn } from '@modules/report-resources/pipes/distinct-months.pipe';
import { FilterYearFn } from '@modules/report-resources/pipes/filter-year.pipe';
import { Select, Store } from '@ngxs/store';
import { CustomSelectors } from '@other/custom-selectors';
import { IntakeHistoryColumns, DateRanges, OrderBacklogDays, BacklogColumns } from '@other/interfaces';
import { DataService } from '@services/data.service';
import { OrderBacklogState } from '@store/order-backlog.state';
import { OrderIntakeHistoryState } from '@store/order-intake-history.state';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportHeaderComponent {
  ranges !: DateRanges;
  days$ !: OrderBacklogDays;

  currentMonthDate$: Observable<string>;

  level: number;
  totalOrAverageSign: Observable<boolean>;
  currentMonth: string;

  @HostBinding('class') get themeClass() {
    return `level${this.level}`;
  };

  params$: Observable<any>;

  constructor(
    public _data: DataService,
    private _ac: ActivatedRoute,
    private _store: Store
  ) {
    this.level = this._ac.snapshot.data.level;
    const report = this._ac.snapshot.data.title;

    // update days and ranges variables depending on the report title
    let methodDays: any;
    let methodRanges: any;
    let dateColumn: string;
    let incommingDateFormat = 'YYYY-MM';

    switch(report) {
      case 'order_intake_history':
        methodDays = OrderIntakeHistoryState.GetLatestAndPreviousDay
        methodRanges = OrderIntakeHistoryState.GetDateRanges
        dateColumn = IntakeHistoryColumns.Date
        incommingDateFormat = 'YYYYMM';
        this.totalOrAverageSign = this._store.select(OrderIntakeHistoryState.GetShowTotal);
        break;
      case 'order_backlog':
      default:
        methodDays = OrderBacklogState.GetLatestAndPreviousDay
        methodRanges = OrderBacklogState.GetDateRanges
        dateColumn = BacklogColumns.Date
        break;
    }

    this.currentMonth = moment().format(incommingDateFormat);

    // get days
    // @ts-ignore
    // ignoring lint errors since we are not assigning the data to ranges variable
    // instead we are assigning the observable to the ranges 
    this.days$ = this._store.select(methodDays)

    // get ranges
    this._store.select(methodRanges).subscribe(res => {
      // @ts-ignore
      this.ranges = res;
    })

    // Grab all params from URL
    this.params$ = this._ac.paramMap
    .pipe(
      map(params => params.keys.reduce((r, a) => (r[a] = params.get(a), r), {} as any))
    );
    this.currentMonthDate$ = this.params$.pipe(
      switchMap(params => this._store.select<any[]>(CustomSelectors.GetZoneOrPlantRows(params.plant, params.id, report)).pipe(
        filter(rows => !!rows),
        map(rows => ([params, rows]))
      )),
      map(([params, rows]) => {
        rows = FilterYearFn(rows, 'current', this.ranges, report);
        rows = DistinctMonthsFn(rows, report);
        rows = rows[params.month];
        return rows[0][dateColumn];
      }),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }

}
