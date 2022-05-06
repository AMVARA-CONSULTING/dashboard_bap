import { Pipe, PipeTransform } from '@angular/core';
import { sumByProperty } from '@other/functions';
import { BacklogColumns } from '@other/interfaces';

@Pipe({
  name: 'sumQuantity'
})
export class SumQuantityPipe implements PipeTransform {

  transform = (values: any[]) => SumQuantityFn(values);

}

export function SumQuantityFn(values: any[]) {
  if (!values || values.length === 0) {
    return NaN;
  }

  return sumByProperty(values, BacklogColumns.Quantity);
}
