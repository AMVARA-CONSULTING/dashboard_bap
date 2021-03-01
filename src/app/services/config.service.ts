import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config, ILanguage } from '@other/interfaces';
import { CognosService } from './cognos.service';
import { Store } from '@ngxs/store';
import { ConfigActions } from '@store/config.state';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { getJsonFromUrl } from '@other/functions';

@Injectable()
export class ConfigService {

  constructor(
    private http: HttpClient,
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
      // Let the developer / user give a custom config
      const customConfig = localStorage.getItem('configFile');
      if (customConfig) {
        configFile = customConfig
      }
      forkJoin([
        this.http.get<Config>('assets/config_common.json'),
        this.http.get<Config>('assets/' + configFile)
      ]).pipe(
        // Merge common config with custom
        map(([common, config]) => ({ ...common, ...config }))
      ).subscribe(config => {
        (window as any).config = config;
        const search: any = getJsonFromUrl();
        // Set variable parameters from search or localStorage
        config.simulateUnauthorized = search.unauthorized ? search.unauthorized : 0;
        config.target = search.target ? search.target : config.target;
        config.debug = search.debug ? search.debug === 'true' : config.debug;
        search.delay = search.delay ? search.delay * 1000 : null;
        config.language = localStorage.getItem('lang') as ILanguage || config.language;
        config.corpintra = corpintra || config.corpintra;
        // Set config object in service and state
        // Please use ConfigState in future code instead of service
        this.config = config as Config;
        this._store.dispatch( new ConfigActions.Set({ ...this.config }) );
        if (this.config.corpintra) {
          // Initialize login process
          this.cognos.load({ ...config }).then(_ => {
            // Show App
            setTimeout(() => resolve(), search.delay || config.delay);
          });
        } else {
          // Show App
          setTimeout(() => resolve(), search.delay || config.delay);
        }
      });
    });
  }

}
