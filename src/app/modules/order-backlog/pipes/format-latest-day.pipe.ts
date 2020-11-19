import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatLatestDay'
})
export class FormatLatestDayPipe implements PipeTransform {

  transform(date: string): string {
    return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
  }

}
