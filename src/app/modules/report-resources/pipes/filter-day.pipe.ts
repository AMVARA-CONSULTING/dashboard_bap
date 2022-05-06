import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { BacklogColumns, IntakeHistoryColumns, OrderBacklogDays } from '@other/interfaces';
import { OrderBacklogState } from '@store/order-backlog.state';
import { OrderIntakeHistoryState } from '@store/order-intake-history.state';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Pipe({
  name: 'filterDay'
})
export class FilterDayPipe implements PipeTransform {

  latestAndPreviousDay$: Observable<OrderBacklogDays>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _store: Store
  ) {
    // get the report that user is viewing currently
    const report = this.activatedRoute.snapshot.data.title;
    let method;
    switch (report) {
      case 'order_intake_history':
        method = OrderIntakeHistoryState.GetLatestAndPreviousDay
        break;
      case 'order_backlog':
      default:
        method = OrderBacklogState.GetLatestAndPreviousDay
        break;
    }
    // Retrieves days from Store State
    this.latestAndPreviousDay$ = this._store.select(method);
  }

  transform(rows: any[], day: 'current' | 'previous'): Observable<any[]> {
    const filteredDay = this.latestAndPreviousDay$.pipe(
      map(days => FilterDayFn(rows, day, days, this.activatedRoute.snapshot.data.title))
    )
    return filteredDay;
  }

}

export function FilterDayFn(rows: any[], day: 'current' | 'previous', days: OrderBacklogDays, report: string = null) {

  let columnName: string;
  // get the Date column name for report based on report value
  switch(report) {
    case 'order_intake_history':
      columnName = IntakeHistoryColumns.Date;
      break;
    case 'order_backlog':
    default:
      columnName = BacklogColumns.Date;
      break;
  }

  if (day === 'current') {
    return rows.filter(row => row[columnName] === days.latestDay);
  } else {
    return rows.filter(row => row[columnName] === days.previousDay);
  }
}
