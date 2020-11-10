import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { BacklogColumns } from '@other/interfaces';
import * as moment from 'moment';

@Pipe({
  name: 'distinctMonths'
})
export class DistinctMonthsPipe implements PipeTransform {

  // Retrieve rows classified by month in descending order (current is first)
  transform(rows: any[]): KeyValue<string, any[]>[] {
    return Object.entries(rows
            .reduce((r, a) => {
              const month = moment(a[BacklogColumns.Date], 'YYYY-MM-DD').format('YYYY-MM');
              r[month] = r[month] || [];
              r[month].push(a);
              return r;
            }, {}))
            .map(months => ({
              key: months[0],
              value: months[1] as any[]
            }));
  }

}
