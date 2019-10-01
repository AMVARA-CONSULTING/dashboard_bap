import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '@other/interfaces';
import { ToolsService } from '@services/tools.service';
import { CognosService } from './cognos.service';

@Injectable()
export class ConfigService {

  constructor(
    private http: HttpClient,
    private tools: ToolsService,
    private cognos: CognosService
  ) {
    (window as any).config = this;
  }

  config: Config

  load(): Promise<void> {
    return new Promise(resolve => {
      const corpintra = location.hostname.indexOf('corpintra.net') > -1
      const configFile = corpintra ? 'cognos.json' : 'config.json'
      this.http.get('assets/' + configFile).subscribe(config => {
        this.config = config as Config
        if (this.config.debug) console.log(config)
        const search: any = this.tools.getJsonFromUrl();
        this.config.simulateUnauthorized = search.unauthorized ? search.unauthorized : 0
        this.config.target = search.target ? search.target : this.config.target
        this.config.debug = search.debug ? search.debug == "true" : this.config.debug
        search.delay = search.delay ? search.delay * 1000 : null
        this.config.language = localStorage.getItem('lang') || this.config.language
        if (corpintra) {
          this.cognos.load(this.config.capabilities[this.config.scenario], Object.assign({}, this.config)).then(_ => {
            setTimeout(() => resolve(), search.delay || this.config.delay)
          })
        } else {
          setTimeout(() => resolve(), search.delay || this.config.delay)
        }
      })
    })
  }

}
