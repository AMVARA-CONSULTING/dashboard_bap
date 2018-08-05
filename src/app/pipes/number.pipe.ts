import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '@services/config.service';

@Pipe({
  name: 'toNumber'
})
export class NumberPipe implements PipeTransform {

  constructor(private config: ConfigService) {}

  transform(value: number) : string {
    if (value == 0) return '0'
    if (value > 0) {
      if (!!false) {
        return '+ ' + parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
      } else {
        return parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
      }
    } else {
      if (!!false) {
        return '- ' + parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
      } else {
        return parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
      }
    }
  }

}
