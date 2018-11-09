import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '@services/config.service';
import memo from 'memo-decorator'

@Pipe({
  name: 'toNumber'
})
export class NumberPipe implements PipeTransform {

  constructor(private config: ConfigService) { }

  @memo((...args: any[]): string => JSON.stringify(args)) // Pipe cache
  transform(value: number, sign?: boolean, comma: boolean = true): string {
    value = Math.round(value)
    sign = sign || false
    comma = comma || true
    let ultimate: string
    if (isNaN(value)) return '-'
    if (value == 0) return '0'
    if (value > 0) {
      if (sign) {
        ultimate = '+ ' + parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
      } else {
        if (value < 0) {
          ultimate = '- ' + parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
        } else {
          ultimate = parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
        }
      }
    } else {
      if (sign) {
        ultimate = '- ' + parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
      } else {
        if (value < 0) {
          ultimate = '- ' + parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
        } else {
          ultimate = parseInt(Math.abs(value).toFixed(0)).toLocaleString(this.config.config.language)
        }
      }
    }
    if (comma) {
      return ultimate
    } else {
      return ultimate.replace(/[,.]/g, '')
    }

  }

}
