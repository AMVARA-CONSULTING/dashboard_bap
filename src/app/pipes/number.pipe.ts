import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '@services/config.service';

@Pipe({
  name: 'toNumber'
})
export class NumberPipe implements PipeTransform {

  constructor(
    private config: ConfigService
  ) { }

  transform = (value: number, sign: boolean = false, comma: boolean = true) => ToNumberFn(value, sign, comma, this.config.config.language);

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
