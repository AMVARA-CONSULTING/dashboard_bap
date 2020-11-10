import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { BacklogColumns } from '@other/interfaces';
import * as moment from 'moment';

@Pipe({
  name: 'distinctYears'
})
export class DistinctYearsPipe implements PipeTransform {

  // Retrieve rows classified by month in descending order (current is first)
  transform(rows: KeyValue<string, any[]>[]): KeyValue<string, any[]>[] {
    return Object.entries(rows.reduce((r, a) => {
      const year = +moment(a[BacklogColumns.Date], 'YYYY-MM-DD').year();
      r[year] = r[year] || [];
      r[year].push(a);
      return r;
    }, {}))
    .map(years => ({
      key: years[0],
      value: years[1] as any[]
    }))
    .reverse();
  }
}
