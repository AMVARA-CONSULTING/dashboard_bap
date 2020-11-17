import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable()
export class ToolsService {

  constructor( ) {
    (window as any).tools = this;
  }

  xsrf_token;

  getJsonFromUrl() {
    const query = location.search.substr(1);
    const result = {};
    query.split('&').forEach(function (part) {
      const item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }

  htmlToJson(data, element): any[] {
    const htmlDoc = new DOMParser().parseFromString(data, 'text/html');
    const table = htmlDoc.querySelectorAll(element);
    const rows = [];
    for (let i = 0; i < table.length; i++) {
      const row = [];
      for (let t = 0; t < table[i].childNodes.length; t++) {
        if (table[i].childNodes[t].childNodes.length === 1) {
          row.push(table[i].childNodes[t].innerText);
        } else {
          row.push(table[i].childNodes[t].childNodes[table[i].childNodes[t].childNodes.length - 1].innerText);
        }
      }
      rows.push(row);
    }
    rows.shift();
    return rows;
  }

  getPlanDate(text: string, moment, config: ConfigService, firstMonth?: boolean): string {
    firstMonth = firstMonth || false;
    if (firstMonth) {
      if (text.lastIndexOf('.') > -1) {
        return moment(text, 'MM.DD.YYYY').format('DD/MM/YYYY');
      } else if (text.indexOf('/') > -1) {
        return moment(text, 'MM/DD/YYYY').format('DD/MM/YYYY');
      } else if (text.indexOf('-') > -1) {
        return moment(text, 'YYYY-MM-DD').format('DD/MM/YYYY');
      } else if (text.indexOf(',') > -1) {
        return moment(text, 'MMM DD, YYYY').format('DD/MM/YYYY');
      } else {
        return moment(text, 'YYYYMMDD').format('DD/MM/YYYY');
      }
    } else {
      if (text.lastIndexOf('.') > -1) {
        return moment(text, 'DD.MM.YYYY').format('DD/MM/YYYY');
      } else if (text.indexOf('/') > -1) {
        return moment(text, 'DD/MM/YYYY').format('DD/MM/YYYY');
      } else if (text.indexOf('-') > -1) {
        return moment(text, 'YYYY-MM-DD').format('DD/MM/YYYY');
      } else if (text.indexOf(',') > -1) {
        return moment(text, 'MMM DD, YYYY').format('DD/MM/YYYY');
      } else {
        return moment(text, 'YYYYMMDD').format('DD/MM/YYYY');
      }
    }
  }

  formatVersion(string): string {
    return 'v' + string.replace(/[^0-9.]/g, '');
  }

  // Get current year
  getYear(): number {
    return (new Date()).getFullYear();
  }

  /* Returns a random integer between min (inclusive) and max (inclusive)
  * Using Math.round() will give you a non-uniform distribution!
  */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /* Return a truthy number */
  removeCommas(x: string): number {
    return +x.toString().replace(/,|./g, '');
  }

  /* Return a percent number with/without sign */
  percent(part: number, total: number, sign?: boolean, space_between?: boolean, zeroSign?: boolean): number | string {
    sign = sign || false;
    space_between = space_between || false;
    zeroSign = zeroSign || false;
    if (zeroSign && total === 0) {
      return '-';
    }
    if (sign) {
      return parseInt(((part * 100) / total).toFixed(0), 10) + (space_between ? ' ' : '') + '%';
    } else {
      return parseInt(((part * 100) / total).toFixed(0), 10);
    }
  }
}
