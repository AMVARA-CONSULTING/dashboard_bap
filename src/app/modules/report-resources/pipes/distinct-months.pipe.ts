import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BacklogColumns, IntakeHistoryColumns } from '@other/interfaces';
import * as moment from 'moment';

@Pipe({
  name: 'distinctMonths'
})
export class DistinctMonthsPipe implements PipeTransform {

  report: string;

  constructor(private _ac: ActivatedRoute) {
    this.report = this._ac.snapshot.data.title;
  }

  // Retrieve rows classified by month in descending order (current is first)
  transform = (rows: any[]) => DistinctMonthsFn(rows, this.report);

}

export function DistinctMonthsFn(rows: any[], report: string = null) {
  // save the format of incomming date and column based on the report
  let incomingDateFormat = 'YYYY-MM-DD'
  let columnName;
  switch(report) {
    case 'order_intake_history':
      incomingDateFormat = 'YYYYMM';
      columnName = IntakeHistoryColumns.Date;
      break;
    case 'order_backlog':
    default:
      incomingDateFormat = 'YYYY-MM-DD';
      columnName = BacklogColumns.Date;
      break;
  }

  return rows.reduce((r, a) => {
    const month = moment(a[columnName], incomingDateFormat).format('YYYY-MM');
    r[month] = r[month] || [];
    r[month].push(a);
    return r;
  }, {});
}
