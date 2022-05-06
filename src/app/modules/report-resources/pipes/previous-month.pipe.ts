import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BacklogColumns, IntakeHistoryColumns } from '@other/interfaces';
import * as moment from 'moment';

@Pipe({
  name: 'previousMonth'
})
export class PreviousMonthPipe implements PipeTransform {
  cutUntil: number;
  columnName: BacklogColumns | IntakeHistoryColumns;

  constructor(private _ac: ActivatedRoute) {
    switch(this._ac.snapshot.data.title) {
      case 'order_intake_history':
        this.cutUntil = 6;
        this.columnName = IntakeHistoryColumns.Date;
        break;
      case 'order_backlog':
      default:
        this.cutUntil = 7;
        this.columnName = BacklogColumns.Date;
        break;
    }
  }

  transform(date: string, previousYearMonths: KeyValue<string, any[]>[]): any[] {
    // First extract month
    const month = moment(date, 'YYYY-MM-DD').subtract(1, 'years').format('YYYY-MM');
    // Find matching month of previous date range and get corresponding values
    try {
      if (previousYearMonths[0].hasOwnProperty('key')) {
        return previousYearMonths.find(mo => mo.key.substring(0, 7) === month).value;
      } else {
        return previousYearMonths.find(mo => mo[this.columnName].substring(0, this.cutUntil) === month).value;
      }
    } catch (err) {
      console.log('Previous month not found for date ' + date);
      return [];
    }
  }

}
