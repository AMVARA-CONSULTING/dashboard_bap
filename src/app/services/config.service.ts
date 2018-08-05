import { Injectable, Inject, APP_INITIALIZER, Optional } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Config } from '@other/interfaces';

@Injectable()
export class ConfigService {

  constructor(private http: HttpClient) { }

  config: Config

  load() : Promise<void> {
    return new Promise(resolve => {
      this.http.get('assets/config.json').subscribe(config => {
        this.config = config as Config
        console.log(config)
        resolve()
      })
    })
  }

}
