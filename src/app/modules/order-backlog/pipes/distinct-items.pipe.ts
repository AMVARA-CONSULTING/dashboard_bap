import { Pipe, PipeTransform } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { BacklogColumns, ILanguage } from '@other/interfaces';
import { ConfigState } from '@store/config.state';

@Pipe({
  name: 'distinctItems'
})
export class DistinctItemsPipe implements PipeTransform {

  @SelectSnapshot(ConfigState.GetLanguageHuman) language: ILanguage;

  transform(rows: any[], type: 'region' | 'product', compareItems: any = null): any {
    if (!rows || rows.length === 0) {
      return {};
    }
    const column = type === 'region' ? BacklogColumns[`Region${this.language}`] : BacklogColumns[`Product${this.language}`];
    const uniques = rows.reduce((r, a) => {
      r[a[column]] = r[a[column]] || [];
      r[a[column]].push(a);
      return r;
    }, {});
    if (compareItems) {
      // If compare object is specified, crossjoin distinct items keys
      for (const key in compareItems) {
        if (compareItems[key]) {
          uniques[key] = uniques[key] || [];
        }
      }
    }
    return uniques;
  }

}