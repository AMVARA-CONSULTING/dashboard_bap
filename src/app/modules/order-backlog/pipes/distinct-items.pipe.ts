import { Pipe, PipeTransform } from '@angular/core';
import { BacklogColumns } from '@other/interfaces';

@Pipe({
  name: 'distinctItems'
})
export class DistinctItemsPipe implements PipeTransform {

  transform(rows: any[], type: 'region' | 'product'): any {
    const column = type === 'region' ? BacklogColumns.RegionEnglish : BacklogColumns.ProductEnglish;
    return rows.reduce((r, a) => {
      r[a[column]] = r[a[column]] || [];
      r[a[column]].push(a);
      return r;
    }, {});
  }

}
