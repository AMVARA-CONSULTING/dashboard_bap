import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config, ILanguage } from '@other/interfaces';
import { ToolsService } from '@services/tools.service';
import { CognosService } from './cognos.service';
import { Store } from '@ngxs/store';
import { ConfigActions } from '@store/config.state';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

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
      let configFile = corpintra ? 'config_daimler.json' : 'config.json';
      if (location.hostname === 'localhost') {
        configFile = 'config_dev.json';
      }
      forkJoin([
        this.http.get('assets/config_common.json'),
        this.http.get('assets/' + configFile)
      ]).pipe(
        // Merge common config with custom
        map(([common, config]: [Config, Config]) => ({ ...common, ...config}))
      ).subscribe((config: Config) => {
        (window as any).config = config;
        const search: any = this.tools.getJsonFromUrl();
        config.simulateUnauthorized = search.unauthorized ? search.unauthorized : 0;
        config.target = search.target ? search.target : config.target;
        config.debug = search.debug ? search.debug === 'true' : config.debug;
        search.delay = search.delay ? search.delay * 1000 : null;
        config.language = localStorage.getItem('lang') as ILanguage || config.language;
        // config.corpintra = corpintra;
        if (corpintra) {
          this.cognos.load(config.capabilities[config.scenario], { ...config }).then(_ => {
            setTimeout(() => resolve(), search.delay || config.delay);
          });
        } else {
          const xsrf_token_local = localStorage.getItem('xsrf');
          if (xsrf_token_local) {
            this.tools.xsrf_token = xsrf_token_local;
          }
          setTimeout(() => resolve(), search.delay || config.delay);
        }
        this.config = config as Config;
        this._store.dispatch( new ConfigActions.Set({ ...this.config }) );
      });
    });
  }

}
