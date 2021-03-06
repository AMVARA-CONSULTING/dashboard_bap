import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { BacklogColumns } from '@other/interfaces';
import * as moment from 'moment';

@Pipe({
  name: 'previousMonth'
})
export class PreviousMonthPipe implements PipeTransform {

  transform(date: string, previousYearMonths: KeyValue<string, any[]>[]): any[] {
    // First extract month
    const month = moment(date, 'YYYY-MM-DD').subtract(1, 'years').format('YYYY-MM');
    // Find matching month of previous date range and get corresponding values
    try {
      if (previousYearMonths[0].hasOwnProperty('key')) {
        return previousYearMonths.find(mo => mo.key.substring(0, 7) === month).value;
      } else {
        return previousYearMonths.find(mo => mo[BacklogColumns.Date].substring(0, 7) === month).value;
      }
    } catch (err) {
      console.log('Previous month not found for date ' + date);
      return [];
    }
  }

}
