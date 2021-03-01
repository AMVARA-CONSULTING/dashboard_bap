import { Pipe, PipeTransform } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { BacklogColumns, DateRanges } from '@other/interfaces';
import { OrderBacklogState } from '@store/order-backlog.state';

@Pipe({
  name: 'filterYear'
})
export class FilterYearPipe implements PipeTransform {

  @SelectSnapshot(OrderBacklogState.GetDateRanges) ranges !: DateRanges;

  // Filter zone rows depending on year
  transform = (rows: any[], year: 'current' | 'previous') => FilterYearFn(rows, year, this.ranges);

}

// CurrentYear: Should be the first 12 months available from now to past
// PreviousYear: Should be the next 12 months available from 12 months ago
// For example: dates = Array(24)
//              Current: dates.slice(0, 12)
//              Previous: dates.slice()
export function FilterYearFn(rows: any[], year: 'current' | 'previous', ranges: DateRanges) {
  if (!rows || rows.length === 0) return [];
  if (year === 'current') {
    return rows.filter(row => ranges.actual.includes(row[BacklogColumns.Date].substring(0, 7)));
  } else {
    return rows.filter(row => ranges.previous.includes(row[BacklogColumns.Date].substring(0, 7)));
  }
}
