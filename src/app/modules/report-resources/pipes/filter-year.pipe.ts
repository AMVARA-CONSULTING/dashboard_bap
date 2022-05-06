import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { IntakeHistoryColumns, DateRanges, BacklogColumns } from '@other/interfaces';
import { OrderBacklogState } from '@store/order-backlog.state';
import { OrderIntakeHistoryState } from '@store/order-intake-history.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'filterYear'
})
export class FilterYearPipe implements PipeTransform {

  ranges$: Observable<DateRanges>;
  report: string;

  constructor(
    private _ac: ActivatedRoute,
    private _store: Store
  ) {
    // get report name from route
    this.report = this._ac.snapshot.data.title;

    // get the method name to get the date ranges depending on report
    let methodRanges: any;
    switch(this.report) {
      case 'order_intake_history':
        methodRanges = OrderIntakeHistoryState.GetDateRanges
        break;
      case 'order_backlog':
      default:
        methodRanges = OrderBacklogState.GetDateRanges
        break;
    }
    // Retrieves ranges from Store State
    this.ranges$ = this._store.select(methodRanges);
  }

  // Filter zone rows depending on year
  transform(rows: any[], year: 'current' | 'previous'): Observable<any[]> {
    return this.ranges$.pipe(
      map(ranges => FilterYearFn(rows, year, ranges, this.report))
    )
  }

}

// CurrentYear: Should be the first 12 months available from now to past
// PreviousYear: Should be the next 12 months available from 12 months ago
// For example: dates = Array(24)
//              Current: dates.slice(0, 12)
//              Previous: dates.slice()
export function FilterYearFn(rows: any[], year: 'current' | 'previous', ranges: DateRanges, report: string = null) {
  // get the column name to use depending on the report
  let columnName = '';
  // get where to cut the date
  let cutUntil = 0;
  switch(report) {
    case 'order_intake_history':
      columnName = IntakeHistoryColumns.Date
      cutUntil = 6;
      break;
    case 'order_backlog':
    default:
      columnName = BacklogColumns.Date
      cutUntil = 7;
      break;
  }
  if (year === 'current') {
    return rows.filter(row => ranges.actual.includes(row[columnName].toString().substr(0, cutUntil)));
  } else {
    return rows.filter(row => ranges.previous.includes(row[columnName].toString().substr(0, cutUntil)));
  }
}
