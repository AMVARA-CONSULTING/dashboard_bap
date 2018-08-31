import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '@services/config.service';

@Pipe({
  name: 'toNumber'
})
export class NumberPipe implements PipeTransform {

  constructor(private config: ConfigService) {}

  transform(value: number, sign?: boolean): string {
    value = Math.round(value)
    sign = sign || false
    if (isNaN(value)) return '-'
    if (value == 0) return '0'
    if (value > 0) {
      if (sign) {
        return '+ ' + parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
      } else {
        if (value < 0) {
          return '- ' + parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
        } else {
          return parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
        }
      }
    } else {
      if (sign) {
        return '- ' + parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
      } else {
        if (value < 0) {
          return '- ' + parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
        } else {
          return parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
        }
      }
    }
  }

}
