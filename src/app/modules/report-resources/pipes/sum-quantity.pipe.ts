import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sumByProperty } from '@other/functions';
import { BacklogColumns, IntakeHistoryColumns } from '@other/interfaces';

@Pipe({
  name: 'sumQuantity'
})
export class SumQuantityPipe implements PipeTransform {
  report: string;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    // get the report that user is viewing currently
    this.report = this.activatedRoute.snapshot.data.title;
  }

  transform = (values: any[]) => SumQuantityFn(values, this.report);

}

export function SumQuantityFn(values: any[], report: string = null) {
  let columnName: string;
  // get the Date column name for report based on report value
  switch(report) {
    case 'order_intake_history':
      let showTotal = localStorage.getItem('intake_history_show_total') == 'true'
      columnName = showTotal ? IntakeHistoryColumns.Total : IntakeHistoryColumns.Average;
      break;
    case 'order_backlog':
    default:
      columnName = BacklogColumns.Quantity;
      break;
  }

  if (!values || values.length === 0) {
    return NaN;
  }
  return sumByProperty(values, columnName);
}
