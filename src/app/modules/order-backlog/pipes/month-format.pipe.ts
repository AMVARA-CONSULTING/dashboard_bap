import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '@services/config.service';
import * as moment from 'moment';

@Pipe({
  name: 'monthFormat'
})
export class MonthFormatPipe implements PipeTransform {

  constructor(
    private _config: ConfigService
  ) { }

  transform(date: string): string {
    return moment(date, 'YYYY-MM-DD').locale(this._config.config.language).format('MMMM YYYY');
  }

}
