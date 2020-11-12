import { Pipe, PipeTransform } from '@angular/core';
import { BacklogColumns } from '@other/interfaces';

@Pipe({
  name: 'distinctProducts'
})
export class DistinctProductsPipe implements PipeTransform {

  transform(rows: any[]): any {
    return rows.reduce((r, a) => {
      r[a[BacklogColumns.ProductEnglish]] = r[a[BacklogColumns.ProductEnglish]] || [];
      r[a[BacklogColumns.ProductEnglish]].push(a);
      return r;
    }, {});
  }

}
