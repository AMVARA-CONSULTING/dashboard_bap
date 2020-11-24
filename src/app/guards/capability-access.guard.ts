import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment, Route } from '@angular/router';
import { CognosService } from '@services/cognos.service';
import { ConfigService } from '@services/config.service';

@Injectable()
export class CapabilityAccess implements CanLoad {

  constructor (
    private _cognos: CognosService,
    private _config: ConfigService
  ) {}

  // This function returns true or false depending on the request
  // route and checks if has access to the requested report
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this._config.config.debug) console.log(route.path)
    if (location.hostname.indexOf('corpintra.net') > -1) {
        const currentRoute = route.path.replace(/\-/, '_');
        const target = this._config.config.target;
        if (this._config.config.debug) console.log('Target:', target)
        if (this._config.config.debug && this._cognos.userCapabilities.getValue().admin) console.log('Conf:', this._cognos.userCapabilities.getValue()[target])
        let access = false;
        try {
          access = this._cognos.userCapabilities.getValue()[target][currentRoute];
        } catch (err) { }
        if (this._config.config.debug) console.log('Decision:', access)
        return access;
    } else {
        return true;
    }
  }
}
