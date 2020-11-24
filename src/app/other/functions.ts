import * as moment from "moment";

/**
 * Classifies an array collection based on a property name
 * @param array An array containing other arrays
 * @param prop Property name to classify
 */
export function classifyByProperty(array: any[], prop: string) {
    return array.reduce((r, a) => {
        r[a[prop]] = r[a[prop]] || [];
        r[a[prop]].push(a);
        return r;
    }, {});
}

/**
 * Retrieves the previous month
 * @param date moment.Moment
 */
export function GetPreviousMonth(date: string) {
  return moment(date, ['YYYY-MM-DD', 'YYYY-MM']).subtract(1, 'years').format('YYYY-MM');
}

/**
 * Sums values of an array collection
 * @param array An array containing other arrays
 * @param i A number defining the index of the desired value to make the sum
 */
export function sumByIndex(array: any[], i: number): number {
    return array.reduce((a, b) => a + parseInt(b[i], 10), 0);
}

/**
 * Sums values of an array collection
 * @param array An array containing other arrays
 * @param prop Property name to use
 */
export function sumByProperty(array: any[], prop: string): number {
    return array.reduce((a, b) => a + parseInt(b[prop], 10), 0);
}

/**
 * Transform any number to humanized format
 * @param value Value in format of number, if passed as string, it will be parsed as int
 * @param htmlFormat Wether or not to return the result using HTML tags
 */
export function numeralFn(value: number | string, htmlFormat: boolean = true) {
    // Try to parse string number as number type
    if (typeof value === 'string') {
      // Parse value as a float, for decimal precision
      value = parseFloat(value);
    }
    // Check if it's negative
    const isNegative = value < 0;
    // Get absolute value
    value = Math.abs(value);
    let formatted = `${value}`;
    // Return as trillions (G), millions (M) or thousands (K)
    let symbol = '';
    const regexThousands = /\B(?=(\d{3})+(?!\d))/g;
    if (Math.abs(value) >= 1000) {
      formatted = (value / 1000).toFixed(0).replace(regexThousands, '.');
      symbol = 'K';
    }
    if (Math.abs(value) >= 1000000) {
      formatted = (value / 1000000).toFixed(0).replace(regexThousands, '.');
      symbol = 'M';
    }
    if (Math.abs(value) >= 1000000000) {
      formatted = (value / 1000000000).toFixed(0).replace(regexThousands, '.');
      symbol = 'G';
    }
    // Formatting
    if (htmlFormat) {
      return `
        <span class="numeral-value">${isNegative ? '- ' : ''}${formatted}</span>
        <span class="numeral-symbol">${symbol}</span>
      `;
    } else {
      return `${isNegative ? '- ' : ''}${formatted} ${symbol}`;
    }
}

/**
 * Converts a dotted format version to number
 */
export function versionToNumber(version: string): number {
  return parseInt(version.replace(/\./, ''), 10);
}
