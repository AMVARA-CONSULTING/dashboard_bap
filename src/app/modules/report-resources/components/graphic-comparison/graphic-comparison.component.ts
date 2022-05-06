import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngxs/store';
import { BacklogColumns, IntakeHistoryColumns, NgxLineChart } from '@other/interfaces';
import { OrderBacklogState } from '@store/order-backlog.state';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from '@services/config.service';
import { DataService } from '@services/data.service';
import { map, startWith } from 'rxjs/operators';
import { SumQuantityFn } from '@modules/report-resources/pipes/sum-quantity.pipe';
import { ActivatedRoute } from '@angular/router';
import { OrderIntakeHistoryState } from '@store/order-intake-history.state';

@Component({
  selector: 'report-graphic-comparison',
  templateUrl: './graphic-comparison.component.html',
  styleUrls: ['./graphic-comparison.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportGraphicComparisonComponent implements OnChanges {

  chart$ = new BehaviorSubject<NgxLineChart>([]);

  colorScheme$: Observable<any>;

  @Input() current: any[];
  @Input() previous: any[];

  report: string;
  method: any;
  incommingDateFormat: string;
  cutUntil: number;
  columnName: any;

  constructor(
    private _store: Store,
    private _config: ConfigService,
    private _data: DataService,
    private _ac: ActivatedRoute
  ) {
    // get the report, incomming date format depending
    // on the report and method to get date ranges from store
    this.report = this._ac.snapshot.data.title;
    switch (this.report) {
      case 'order_intake_history':
        this.incommingDateFormat = 'YYYYMM';
        this.cutUntil = 6;
        this.method = OrderIntakeHistoryState.GetDateRanges;
        this.columnName = IntakeHistoryColumns.Date;
        break;
      case 'order_backlog':
      default:
        this.incommingDateFormat = 'YYYY-MM';
        this.cutUntil = 7;
        this.method = OrderBacklogState.GetDateRanges;
        this.columnName = BacklogColumns.Date;
        break;
    }

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
      const dateRanges = this._store.selectSnapshot(this.method);
      // Get the months numbers we expect to show in chart
      // @ts-ignore
      const currentMonthsRange = [ ...dateRanges.actual ].sort();
      // @ts-ignore
      const previousMonthsRange = [ ...dateRanges.previous ].sort();
      // Get the rows for every month number and for actual / previous
      const currentMonths = currentRows.reduce((r, a) => {
        const month = a[this.columnName].toString().substring(0, this.cutUntil);
        r[month] = r[month] || [];
        r[month].push(a);
        return r;
      }, {});
      const previousMonths = previousRows.reduce((r, a) => {
        const month = a[this.columnName].toString().substring(0, this.cutUntil);
        r[month] = r[month] || [];
        r[month].push(a);
        return r;
      }, {});
      // Create basic scheme for chart
      const chart: NgxLineChart = [
        { name: 'Last 12 Month', series: [] },
        { name: 'Prev. Year', series: [] }
      ];
      let i = 0;
      const length = currentMonthsRange.length;
      for ( ; i < length ; i++ ) {
        // Push current value
        const currentMonthIndex = currentMonthsRange[i];
        // check if currentMonthIndex value is in currentMonths
        if ( ! (currentMonthIndex in currentMonths) ) continue;
        chart[0].series.push({
          name: moment(currentMonths[currentMonthIndex][0][this.columnName], this.incommingDateFormat).toDate(),
          value: SumQuantityFn(currentMonths[currentMonthIndex], this.report),
          extra: {
            original: moment(currentMonths[currentMonthIndex][0][this.columnName], this.incommingDateFormat).toDate()
          }
        });
        // Push previous value
        const previousMonthIndex = previousMonthsRange[i];
        let originalItem = null;
        try {
          originalItem = moment(previousMonths[previousMonthIndex][0][this.columnName], this.incommingDateFormat).toDate();
        } catch (err) { }
        chart[1].series.push({
          name: moment(currentMonths[currentMonthIndex][0][this.columnName], this.incommingDateFormat).toDate(),
          value: previousMonths[previousMonthIndex] ? SumQuantityFn(previousMonths[previousMonthIndex], this.report) : 0,
          extra: {
            original: originalItem
          }
        });
      }
      this.chart$.next(chart);
    }
  }

  xAxisTickFormatting = value => moment(value).locale(this._config.config.language).format('MMM');

  xAxisTickFormattingFn = this.xAxisTickFormatting.bind(this);

}
