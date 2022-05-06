import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BacklogColumns, IntakeHistoryColumns } from '@other/interfaces';
import * as moment from 'moment';

@Pipe({
  name: 'distinctYears'
})
export class DistinctYearsPipe implements PipeTransform {

  report: string;

  constructor(private _ac: ActivatedRoute) {

    this.report = this._ac.snapshot.data.title;

  }

  // Retrieve rows classified by month in descending order (current is first)
  transform(rows: KeyValue<string, any[]>[]): KeyValue<string, any[]>[] {

    // get the column name and incomming date format based on the report
    let incommingDateFormat;
    let columnName;

    switch (this.report) {
      case 'order_intake_history':
        columnName = IntakeHistoryColumns.Date;
        incommingDateFormat = 'YYYYMM';
        break;
      case 'order_backlog':
      default:
        columnName = BacklogColumns.Date;
        incommingDateFormat = 'YYYY-MM-DD';
        break;
    }

    return Object.entries(rows.reduce((r, a) => {
      const year = +moment(a[columnName], incommingDateFormat).year();
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
