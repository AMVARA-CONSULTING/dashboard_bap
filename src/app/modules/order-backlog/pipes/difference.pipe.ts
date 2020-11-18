import { Pipe, PipeTransform } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { numeralFn } from '@other/functions';
import { ILanguage } from '@other/interfaces';
import { ToNumberFn } from '@pipes/number.pipe';
import { DataService } from '@services/data.service';
import { ConfigState } from '@store/config.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'difference'
})
export class DifferencePipe implements PipeTransform {

  constructor(
    private _data: DataService
  ) { }

  @SelectSnapshot(ConfigState.GetLanguage) language: ILanguage;

  // Get difference with symbol
  transform(before: number, after: number): Observable<string> {
    return this._data.mobile$.pipe(
      map(mobile => {
        if (isNaN(before) || isNaN(after)) {
          return '-';
        }
        const value = after - before;
        if (mobile) {
          return numeralFn(value, true);
        } else {
          if (value === 0) {
            return '-';
          } else if (value > 0) {
            return `+ ${ToNumberFn(Math.abs(value), false, true, this.language)}`;
          } else {
            return `- ${ToNumberFn(Math.abs(value), false, true, this.language)}`;
          }
        }
      })
    );
  }

}
