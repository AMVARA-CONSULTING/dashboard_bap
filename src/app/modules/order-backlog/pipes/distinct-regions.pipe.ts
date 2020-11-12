import { Pipe, PipeTransform } from '@angular/core';
import { BacklogColumns } from '@other/interfaces';

@Pipe({
  name: 'distinctRegions'
})
export class DistinctRegionsPipe implements PipeTransform {

  transform(rows: any[]): any {
    return rows.reduce((r, a) => {
      r[a[BacklogColumns.RegionEnglish]] = r[a[BacklogColumns.RegionEnglish]] || [];
      r[a[BacklogColumns.RegionEnglish]].push(a);
      return r;
    }, {});
  }

}
