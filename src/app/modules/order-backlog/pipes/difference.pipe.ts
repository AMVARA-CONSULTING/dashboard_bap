import { Pipe, PipeTransform } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { ILanguage } from '@other/interfaces';
import { ToNumberFn } from '@pipes/number.pipe';
import { ConfigState } from '@store/config.state';

@Pipe({
  name: 'difference'
})
export class DifferencePipe implements PipeTransform {

  @SelectSnapshot(ConfigState.GetLanguage) language: ILanguage;

  // Get difference with symbol
  transform(before: number, after: number): string {
    if (isNaN(before)) {
      before = 0;
    }
    if (isNaN(after)) {
      after = 0;
    }
    const value = after - before;
    if (value === 0) {
      return '-';
    } else if (value > 0) {
      return `+ ${ToNumberFn(Math.abs(value), false, true, this.language)}`;
    } else {
      return `- ${ToNumberFn(Math.abs(value), false, true, this.language)}`;
    }
  }

}