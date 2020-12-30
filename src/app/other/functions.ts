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
 * Retrieves the value for a given cookie name
 * @param name Cookie name
 * @returns string | undefined
 */
export function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length == 2) return parts.pop().split(';').shift()
}

/**
 * Convert HTML string to JSON format
 * @param data HTML String
 * @param element [lid] attribute of Cognos table
 */
export function htmlToJson(data, element): any[] {
  // Parse HTML
  const htmlDoc = new DOMParser().parseFromString(data, 'text/html');
  // Get table by lid
  const table = htmlDoc.querySelectorAll(element);
  const rows = [];
  // Iterate over each row
  for (let i = 0; i < table.length; i++) {
    const row = [];
    // Iterate over each field
    for (let t = 0; t < table[i].childNodes.length; t++) {
      // Check if field contains 1 or more spans
      if (table[i].childNodes[t].childNodes.length === 1) {
        row.push(table[i].childNodes[t].innerText);
      } else {
        row.push(table[i].childNodes[t].childNodes[table[i].childNodes[t].childNodes.length - 1].innerText);
      }
    }
    rows.push(row);
  }
  // Remove headers
  rows.shift();
  return rows;
}

/**
 * Retrieves a search URIComponent as a JSON object
 */
export function getJsonFromUrl() {
  const query = location.search.substr(1);
  const result = {};
  query.split('&').forEach(function (part) {
    const item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
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


/**
 * Sanitizes a CSV text string
 * @param csv String of CSV file
 * @url https://stackoverflow.com/questions/53776683/regex-find-newline-between-double-quotes-and-replace-with-space
 */
export function sanitizeCSV(csv: string): string {
  // Remove new lines and carriage returns between double quotes
  csv = csv.replace(/"[^"]*"/g, (match, capture) => match.replace(/[\n\r]\s*/g, ''));
  return csv;
}

/**
 * Retrieves a list of valid delimiters for a given CSV string
 * @param csv String of CSV file
 * @param delimiters Array of possible delimiters
 * @param fallbackDelimiter Default delimiter to use if no other is found
 * @url https://www.elasticfeed.com/a1bd25ce92c8282f28bbaf96fef109bd/
 * @returns An array of possible delimiters
 */
export function guessCSVDelimiter(csv: string, delimiters: string[] = [';',',','\t'], fallbackDelimiter: string = '\t'): string {
  // Filter delimiters by validating function
  const validDelimiters = delimiters.filter(checkDelimiter);
  return validDelimiters.length > 0 ? validDelimiters[0] : fallbackDelimiter;
  function checkDelimiter(delimiter) {
    // Set default number of fields per line
    let cache = -1;
    // Split lines and make sure every line using current delimiter has the same length of fields
    return csv.split('\n').every(checkLength);
    function checkLength(line) {
      if (!line) return true;
      // Get number of fields in current line
      const length = line.split(delimiter).length;
      if (cache < 0) cache = length;
      // Check if final line field count is same as first line
      return cache === length && length > 1;
    }
  }
}

/**
 * Function to convert CSV string data to JSON Array data
 * @param csv string csv data
 * @param numeralFields array of indexes which should parsed as numeral
 * @param removeHeaders provide true to remove first line of headers
 */
export function csvToJson(csv: string, numeralFields: number[], removeHeaders: boolean = true) {
  csv = sanitizeCSV(csv);
  const delimiter = guessCSVDelimiter(csv);
  const lines: any[] = csv.split('\n');
  const data = [];
  if (removeHeaders) {
    lines.splice(0, 1);
  }
  const length = lines.length;
  let i = 1;
  for ( ; i < length; i++ ) {
    // Remove empty lines
    if (lines[i].trim().length === 0) {
      continue;
    }
    const values = lines[i].split(delimiter);
    numeralFields.forEach(num => {
      values[num] = isNaN(values[num]) ? 0 : parseFloat(values[num]);
    });
    data.push(values);
  }
  return data;
}

/**
 * Function to convert CSV string data to JSON Array data with headers as keys
 * @param csv string csv data
 * @param numeralFields array of indexes which should parsed as numeral
 * @param removeHeaders provide true to remove first line of headers
 */
export function csvToJsonNamed(csv: string): any[] {
  csv = sanitizeCSV(csv);
  const delimiter = guessCSVDelimiter(csv);
  const rows = [];
  const lines: any[] = csv.split('\n');
  const headers = lines.shift().split(delimiter).map(el => el.trim());
  lines.forEach(line => {
    if (line.length > 0) {
      const newRow = {};
      line.split(delimiter).forEach((element, index) => {
        newRow[headers[index]] = element.trim();
      });
      rows.push(newRow);
    }
  });
  return rows;
}

/**
 * Format a dot separated version as v?
 * */
export function formatVersion(string): string {
  return 'v' + string.replace(/[^0-9.]/g, '');
}

// Get current year
export function getYear(): number {
  return (new Date()).getFullYear();
}

/* Returns a random integer between min (inclusive) and max (inclusive)
* Using Math.round() will give you a non-uniform distribution!
*/
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Return a truthy number */
export function removeCommas(x: string): number {
  return +x.toString().replace(/,|./g, '');
}

/* Return a percent number with/without sign */
export function percent(part: number, total: number, sign?: boolean, space_between?: boolean, zeroSign?: boolean): number | string {
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

/**
 * Retrieves a date formatted as DD/MM/YYYY using multiple parse formats
 * @param text String of date
 * @param moment Moment plugin object
 * @param firstMonth Wether of not date contains month as first value in format
 */
export function getPlanDateWithMoment(text: string, moment, firstMonth: boolean = false): string {
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