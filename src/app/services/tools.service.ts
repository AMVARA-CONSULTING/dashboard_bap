import { Injectable } from '@angular/core';

@Injectable()
export class ToolsService {

  constructor() { }

  xsrf_token

  getJsonFromUrl() {
    var query = location.search.substr(1)
    var result = {}
    query.split("&").forEach(function (part) {
      var item = part.split("=")
      result[item[0]] = decodeURIComponent(item[1])
    });
    return result
  }

  // Get current year
  getYear(): number {
    return (new Date()).getFullYear()
  }

  /* Returns a random integer between min (inclusive) and max (inclusive)
  * Using Math.round() will give you a non-uniform distribution!
  */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /* Return a truthy number */
  removeCommas(x: string): number {
    return +x.toString().replace(/,|./g, '')
  }

  /* Return a percent number with/without sign */
  percent(part: number, total: number, sign?: boolean, space_between?: boolean, zeroSign?: boolean): number | string {
    sign = sign || false
    space_between = space_between || false
    zeroSign = zeroSign || false
    if (zeroSign && total == 0) {
      return '-'
    }
    if (sign) {
      return parseInt(((part * 100) / total).toFixed(0)) + (space_between ? ' ' : '') + '%'
    } else {
      return parseInt(((part * 100) / total).toFixed(0))
    }
  }
}
