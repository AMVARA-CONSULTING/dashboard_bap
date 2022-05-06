import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BacklogColumns, IntakeHistoryColumns } from '@other/interfaces';

@Pipe({
  name: 'mockMissingPreviousRows'
})
export class MockMissingPreviousRowsPipe implements PipeTransform {

  report: string;
  columnName: string;

  constructor(private _ac: ActivatedRoute) {
    this.report = this._ac.snapshot.data.title;
    switch(this.report) {
      case 'order_intake_history':
        let showTotal = localStorage.getItem('intake_history_show_total') == 'true';
        this.columnName = showTotal ? IntakeHistoryColumns.Total : IntakeHistoryColumns.Average;
        break;
      case 'order_backlog':
      default:
        this.columnName = BacklogColumns.Quantity;
        break;
    }
  }

  /**
   * This is a pipe which takes the current result of reduced items and the result of previous reduced items,
   * and compares them to add the missing keys in current from the previous, mocking the row value
   */
  transform(current: any, previous: any): any {
    for (const key in previous) {
      if (previous[key] && !current.hasOwnProperty(key)) {
        // Mock rows with non value
        current[key] = previous[key].map(row => {
          return {
            ...row,
            [this.columnName]: ''
          };
        });
      }
    }
    return current;
  }

}
