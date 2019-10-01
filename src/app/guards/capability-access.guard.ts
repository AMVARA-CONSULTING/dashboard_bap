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
        const currentRoute = route.path
        const target = this._config.config.target
        if (this._config.config.debug) console.log('Target:', target)
        if (this._config.config.debug) console.log('Conf:', this._cognos.userCapabilities[target])
        let access = false
        switch (currentRoute) {
            case 'order-intake': access = this._cognos.userCapabilities[target].order_intake; break;
            case 'production-program': access = this._cognos.userCapabilities[target].production_program; break;
            case 'allocation': access = this._cognos.userCapabilities[target].allocation; break;
            case 'plant-stock': access = this._cognos.userCapabilities[target].plant_stock; break;
            default: access = false
        }
        if (this._config.config.debug)  console.log('Decision:', access)
        return access
    } else {
        return true
    }
  }
}
