import { Pipe, PipeTransform } from '@angular/core';
import { BacklogColumns } from '@other/interfaces';
import * as moment from 'moment';

@Pipe({
  name: 'filterYear'
})
export class FilterYearPipe implements PipeTransform {

  // Filter zone rows depending on year
  transform = (rows: any[], year: 'current' | 'previous') => FilterYearFn(rows, year);

}

export function FilterYearFn(rows: any[], year: 'current' | 'previous') {
  const currentYear = moment().format('YYYY');
  const previousYear = moment().subtract(1, 'years').format('YYYY');
  return rows.filter(row => row[BacklogColumns.Date].substring(0, 4) === (year === 'current' ? currentYear : previousYear));
}
