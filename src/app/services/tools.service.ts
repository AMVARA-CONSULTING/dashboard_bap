import { Injectable } from '@angular/core';

@Injectable()
export class ToolsService {

  constructor() { }

  getJsonFromUrl() {
    var query = location.search.substr(1)
    var result = {}
    query.split("&").forEach(function(part) {
      var item = part.split("=")
      result[item[0]] = decodeURIComponent(item[1])
    });
    return result
  }

  // Get current year
  getYear() : number {
    return (new Date()).getFullYear()
  }

  /* Returns a random integer between min (inclusive) and max (inclusive)
  * Using Math.round() will give you a non-uniform distribution!
  */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
