import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Config } from '@other/interfaces';
import { ToolsService } from '@services/tools.service';

@Injectable()
export class ConfigService {

  constructor(
    private http: HttpClient,
    private tools: ToolsService
  ) { }

  config: Config

  load() : Promise<void> {
    return new Promise(resolve => {
      const configFile = location.hostname.indexOf('corpintra.net') > -1 ? 'cognos.json' : 'config.json'
      this.http.get('assets/'+configFile).subscribe(config => {
        this.config = config as Config
        console.log(config)
        const search: any = this.tools.getJsonFromUrl()
        search.delay = search.delay ? search.delay * 1000 : null
        this.config.language = localStorage.getItem('lang') || this.config.language
        setTimeout(() => resolve(), search.delay || this.config.delay)
      })
    })
  }

}
