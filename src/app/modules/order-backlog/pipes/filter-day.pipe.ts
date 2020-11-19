import { Pipe, PipeTransform } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { BacklogColumns, OrderBacklogDays } from '@other/interfaces';
import { OrderBacklogState } from '@store/order-backlog.state';

@Pipe({
  name: 'filterDay'
})
export class FilterDayPipe implements PipeTransform {

  @SelectSnapshot(OrderBacklogState.GetLatestAndPreviousDay) days$ !: OrderBacklogDays;

  transform(rows: any[], day: 'current' | 'previous'): any[] {
    return FilterDayFn(rows, day, this.days$);
  }

}

export function FilterDayFn(rows: any[], day: 'current' | 'previous', days: OrderBacklogDays) {
  if (day === 'current') {
    return rows.filter(row => row[BacklogColumns.Date].substring(0, 7) === days.latestDay.substring(0, 7));
  } else {
    return rows.filter(row => row[BacklogColumns.Date].substring(0, 7) === days.previousDay.substring(0, 7));
  }
}
