import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { numeralFn } from '@other/functions';
import { ILanguage } from '@other/interfaces';
import { DataService } from '@services/data.service';
import { ConfigState } from '@store/config.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'toNumber'
})
export class NumberPipe implements PipeTransform {

  constructor(
    private _ac: ActivatedRoute,
    private _data: DataService
  ) { }

  @SelectSnapshot(ConfigState.GetLanguage) language: ILanguage;

  transform(value: number, sign: boolean = false, comma: boolean = true): string | Observable<string> {
    // Temporarily only check mobile in Order Backlog
    if (this._ac.snapshot.data.title === 'order_backlog') {
      return this._data.mobile$.pipe(
        map(mobile => {
          if (mobile) {
            return numeralFn(value, true);
          } else {
            return ToNumberFn(value, sign, comma, this.language);
          }
        })
      );
    } else {
      return ToNumberFn(value, sign, comma, this.language);
    }
  }

}

export function ToNumberFn(value: number, sign: boolean = false, comma: boolean = true, language: string = 'en') {
  if (isNaN(value)) {
    return '-';
  }
  value = Math.round(value);
  let ultimate: string
  if (value == 0) return '0'
  if (value > 0) {
    if (sign) {
      ultimate = '+ ' + parseInt(Math.abs(value).toFixed(0), 10).toLocaleString(language);
    } else {
      if (value < 0) {
        ultimate = '- ' + parseInt(Math.abs(value).toFixed(0), 10).toLocaleString(language);
      } else {
        ultimate = parseInt(Math.abs(value).toFixed(0), 10).toLocaleString(language);
      }
    }
  } else {
    if (sign) {
      ultimate = '- ' + parseInt(Math.abs(value).toFixed(0), 10).toLocaleString(language);
    } else {
      if (value < 0) {
        ultimate = '- ' + parseInt(Math.abs(value).toFixed(0), 10).toLocaleString(language);
      } else {
        ultimate = parseInt(Math.abs(value).toFixed(0), 10).toLocaleString(language);
      }
    }
  }
  if (comma) {
    return ultimate;
  } else {
    return ultimate.replace(/[,.]/g, '');
  }
}
