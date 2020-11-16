import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config, ILanguage } from '@other/interfaces';
import { ToolsService } from '@services/tools.service';
import { CognosService } from './cognos.service';
import { Store } from '@ngxs/store';
import { ConfigActions } from '@store/config.state';

@Injectable()
export class ConfigService {

  constructor(
    private http: HttpClient,
    private tools: ToolsService,
    private cognos: CognosService,
    private _store: Store
  ) {
    (window as any).config = this;
  }

  config: Config;

  load(): Promise<void> {
    return new Promise(resolve => {
      const corpintra = location.hostname.indexOf('corpintra.net') > -1;
      const configFile = corpintra ? 'cognos.json' : 'config.json';
      this.http.get('assets/' + configFile).subscribe((config: Config) => {
        (window as any).config = config;
        const search: any = this.tools.getJsonFromUrl();
        config.simulateUnauthorized = search.unauthorized ? search.unauthorized : 0;
        config.target = search.target ? search.target : config.target;
        config.debug = search.debug ? search.debug === 'true' : config.debug;
        search.delay = search.delay ? search.delay * 1000 : null;
        config.language = localStorage.getItem('lang') as ILanguage || config.language;
        config.corpintra = corpintra;
        if (config.debug) {
          console.log(config);
        }
        if (corpintra) {
          this.cognos.load(config.capabilities[config.scenario], { ...config }).then(_ => {
            setTimeout(() => resolve(), search.delay || config.delay);
          });
        } else {
          setTimeout(() => resolve(), search.delay || config.delay);
        }
        this.config = config as Config;
        this._store.dispatch( new ConfigActions.Set({ ...this.config }) );
      });
    });
  }

}
