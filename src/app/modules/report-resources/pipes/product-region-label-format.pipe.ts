import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '@services/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'productRegionLabelFormat'
})
export class ProductRegionLabelFormatPipe implements PipeTransform {

  constructor(
    private _data: DataService
  ) { }

  transform(value: string): Observable<string> {
    value = value.split('|')[1];
    return this._data.mobile$.pipe(
      map(mobile => {
        if (mobile) {
          return value.length > 10 ? value.substring(0, 14) + '...' : value;
        } else {
          return value;
        }
      })
    );
  }

}
