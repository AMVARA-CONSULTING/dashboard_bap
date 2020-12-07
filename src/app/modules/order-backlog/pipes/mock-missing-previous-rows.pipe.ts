import { Pipe, PipeTransform } from '@angular/core';
import { BacklogColumns } from '@other/interfaces';

@Pipe({
  name: 'mockMissingPreviousRows'
})
export class MockMissingPreviousRowsPipe implements PipeTransform {

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
            [BacklogColumns.Quantity]: ''
          };
        });
      }
    }
    return current;
  }

}
