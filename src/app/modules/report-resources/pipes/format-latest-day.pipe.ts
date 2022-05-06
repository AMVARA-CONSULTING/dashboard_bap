import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Pipe({
  name: 'formatLatestDay'
})
export class FormatLatestDayPipe implements PipeTransform {

  constructor(private _ac: ActivatedRoute) {}

  transform(date: string, extra: string = null): string {
    const report = this._ac.snapshot.data.title;
    let incomingFormat = ''
    let outputFormat = ''
    switch(report) {
      case 'order_intake_history':
        incomingFormat = 'YYYYMM'
        outputFormat = 'MM/YYYY'
        if (extra == 'today') return moment().subtract(1, 'days').format('DD/MM/YYYY')
        break;
      case 'order_backlog':
      default:
        incomingFormat = 'YYYY-MM-DD'
        outputFormat = 'DD/MM/YYYY'
        if (extra == 'monthOnly') outputFormat = 'MM/YYYY';
        break;
    }
    return moment(date, incomingFormat).format(outputFormat);
  }

}
