import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SumQuantityFn } from './sum-quantity.pipe';

@Pipe({
  name: 'max'
})
export class MaxPipe implements PipeTransform {
  report: string;

  constructor(private _ac: ActivatedRoute) {
    this.report = this._ac.snapshot.data.title;
  }

  transform(currentValues: KeyValue<string, any[]>[], previousValues: KeyValue<string, any[]>[]): number {
    let highestCurrent = 0;
    let highestPrevious = 0;
    // Get maximum value of current items
    if (currentValues && currentValues.length > 0) {
      const numbers = currentValues.map(value => SumQuantityFn(value.value, this.report)).filter(num => !isNaN(num));
      highestCurrent = Math.max(...numbers);
    }
    // Get maximum value of previous items
    if (previousValues && previousValues.length > 0) {
      const numbers = previousValues.map(value => SumQuantityFn(value.value, this.report)).filter(num => !isNaN(num));
      highestPrevious = Math.max(...numbers);
    }
    // Get total highest^
    return Math.max(highestCurrent, highestPrevious);
  }

}