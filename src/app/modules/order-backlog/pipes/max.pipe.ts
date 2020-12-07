import { SumQuantityFn } from '@modules/order-backlog/pipes/sum-quantity.pipe';
import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'max'
})
export class MaxPipe implements PipeTransform {

  transform(currentValues: KeyValue<string, any[]>[], previousValues: KeyValue<string, any[]>[]): number {
    let highestCurrent = 0;
    let highestPrevious = 0;
    // Get maximum value of current items
    if (currentValues && currentValues.length > 0) {
      const numbers = currentValues.map(value => SumQuantityFn(value.value)).filter(num => !isNaN(num));
      highestCurrent = Math.max(...numbers);
    }
    // Get maximum value of previous items
    if (previousValues && previousValues.length > 0) {
      const numbers = previousValues.map(value => SumQuantityFn(value.value)).filter(num => !isNaN(num));
      highestPrevious = Math.max(...numbers);
    }
    // Get total highest^
    return Math.max(highestCurrent, highestPrevious);
  }

}