import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SumQuantityFn } from '@modules/order-backlog/pipes/sum-quantity.pipe';
import { Store } from '@ngxs/store';
import { BacklogColumns, NgxLineChart } from '@other/interfaces';
import { OrderBacklogState } from '@store/order-backlog.state';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from '@services/config.service';
import { DataService } from '@services/data.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'order-backlog-graphic-comparison',
  templateUrl: './graphic-comparison.component.html',
  styleUrls: ['./graphic-comparison.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderBacklogGraphicComparisonComponent implements OnChanges {

  chart$ = new BehaviorSubject<NgxLineChart>([]);

  colorScheme$: Observable<any>;

  @Input() current: any[];
  @Input() previous: any[];

  constructor(
    private _store: Store,
    private _config: ConfigService,
    private _data: DataService
  ) {
    // Pipe the lightTheme FormControl for the correct chart colors
    // startWith is needed because valueChanges doesn't emit until there's a change
    this.colorScheme$ = this._data.lightTheme.valueChanges.pipe(
      startWith(this._data.lightTheme.value),
      map(lightTheme => {
        const darkPalette = ['#28E8FF', '#F8B03B'];
        const lightPalette = ['#17687F', '#E59123'];
        return { domain: lightTheme ? lightPalette : darkPalette };
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    // Grab values from @Input()
    const currentRows = changes.current.currentValue as any[];
    const previousRows = changes.previous.currentValue as any[];
    // Check the arrays are filled
    if (currentRows.length > 0 && previousRows.length > 0) {
      // Grab the date ranges for Actual and Previous from Store
      const dateRanges = this._store.selectSnapshot(OrderBacklogState.GetDateRanges);
      // Get the months numbers we expect to show in chart
      const currentMonthsRange = [ ...dateRanges.actual ].sort();
      const previousMonthsRange = [ ...dateRanges.previous ].sort();
      // Get the rows for every month number and for actual / previous
      const currentMonths = currentRows.reduce((r, a) => {
        const month = a[BacklogColumns.Date].substring(0, 7);
        r[month] = r[month] || [];
        r[month].push(a);
        return r;
      }, {});
      const previousMonths = previousRows.reduce((r, a) => {
        const month = a[BacklogColumns.Date].substring(0, 7);
        r[month] = r[month] || [];
        r[month].push(a);
        return r;
      }, {});
      // Create basic scheme for chart
      const chart: NgxLineChart = [
        { name: 'Last 12 Month', series: [] },
        { name: 'Prev. 12 Month', series: [] }
      ];
      let i = 0;
      const length = currentMonthsRange.length;
      for ( ; i < length ; i++ ) {
        // Push current value
        const currentMonthIndex = currentMonthsRange[i];
        chart[0].series.push({
          name: moment(currentMonths[currentMonthIndex][0][BacklogColumns.Date], 'YYYY-MM').toDate(),
          value: SumQuantityFn(currentMonths[currentMonthIndex]),
          extra: {
            original: moment(currentMonths[currentMonthIndex][0][BacklogColumns.Date], 'YYYY-MM').toDate()
          }
        });
        // Push previous value
        const previousMonthIndex = previousMonthsRange[i];
        chart[1].series.push({
          name: moment(currentMonths[currentMonthIndex][0][BacklogColumns.Date], 'YYYY-MM').toDate(),
          value: SumQuantityFn(previousMonths[previousMonthIndex]),
          extra: {
            original: moment(previousMonths[previousMonthIndex][0][BacklogColumns.Date], 'YYYY-MM').toDate()
          }
        });
      }
      this.chart$.next(chart);
    }
  }

  xAxisTickFormatting = value => moment(value).locale(this._config.config.language).format('MMM');

  xAxisTickFormattingFn = this.xAxisTickFormatting.bind(this);

}
