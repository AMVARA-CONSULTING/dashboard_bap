import { Injectable } from '@angular/core';

@Injectable()
export class ToolsService {

  constructor() { }

  public getJsonFromUrl() {
    var query = location.search.substr(1)
    var result = {}
    query.split("&").forEach(function(part) {
      var item = part.split("=")
      result[item[0]] = decodeURIComponent(item[1])
    });
    return result
  }
}
