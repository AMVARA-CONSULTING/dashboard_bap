import { Pipe, PipeTransform } from '@angular/core';
import { ToNumberFn } from '@pipes/number.pipe';

@Pipe({
  name: 'difference'
})
export class DifferencePipe implements PipeTransform {

  // Get difference with symbol
  transform(before: number, after: number): string {
    if (isNaN(before) || isNaN(after)) {
      return '-';
    }
    const value = after - before;
    if (value === 0) {
      return '-';
    } else if (value > 0) {
      return `+ ${ToNumberFn(Math.abs(value))}`;
    } else {
      return `- ${ToNumberFn(Math.abs(value))}`;
    }
  }

}
