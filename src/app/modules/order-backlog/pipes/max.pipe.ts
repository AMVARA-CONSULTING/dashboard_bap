import { SumQuantityFn } from '@modules/order-backlog/pipes/sum-quantity.pipe';
import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'max'
})
export class MaxPipe implements PipeTransform {

  transform(values: KeyValue<string, any[]>[]): number {
    if (!values || values.length === 0) {
      return 0;
    }
    const numbers = values.map(value => SumQuantityFn(value.value));
    return Math.max(...numbers);
  }

}
