import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment, Route } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Config } from '@other/interfaces';
import { CognosService } from '@services/cognos.service';
import { ConfigState } from '@store/config.state';

@Injectable()
export class CapabilityAccess implements CanLoad {

  @SelectSnapshot(ConfigState) config !: Config;

  constructor (
    private _cognos: CognosService
  ) {}

  // This function returns true or false depending on the request
  // route and checks if has access to the requested report
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.config.debug) console.log(route.path) // Debug
    if (this.config.corpintra) {
      // Get route current path and replace - with _
      const currentRoute = route.path.replace(/\-/, '_');
      // Retrieve current target
      const target = this.config.target;
      if (this.config.debug) console.log('Target:', target) // Debug
      if (this.config.debug && this._cognos.userCapabilities.getValue().admin) console.log('Conf:', this._cognos.userCapabilities.getValue()[target])
      let access = false;
      try {
        // Retrieve current route access from user capabilities
        access = this._cognos.userCapabilities.getValue()[target][currentRoute];
      } catch (err) { }
      if (this.config.debug) console.log('Decision:', access) // Debug
      return access;
    } else {
      return true; // Give access to any on non Cognos Server
    }
  }
}
