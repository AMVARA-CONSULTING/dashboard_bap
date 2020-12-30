import { Injectable } from '@angular/core';
import { DataService } from '@services/data.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { ConfigState } from '@store/config.state';
import { Config } from '@other/interfaces';
import { CognosService } from '@services/cognos.service';

@Injectable()
export class AccessGranted implements CanActivate {

  @SelectSnapshot(ConfigState) config !: Config;

  constructor (
    private data: DataService,
    private router: Router,
    private _cognos: CognosService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.config.corpintra) {
      // Check user capabilities in Cognos Server
      this.data.accessGranted = this._cognos.userCapabilities.getValue()[this.config.target][route.data.title];
      if (this.data.accessGranted || ['about','help'].includes(route.data.title)) {
        return true;
      } else {
        return this.router.createUrlTree(['/'], { queryParamsHandling: 'merge' })
      }
    }
    if (location.href.includes('bypass') || location.hostname.includes('localhost') || localStorage.getItem('accessGranted') === 'yes') {
      this.data.accessGranted = true
      return true
    }
    if (!this.data.accessGranted) return this.router.createUrlTree(['miami-access'], { queryParamsHandling: 'merge' })
    return this.data.accessGranted
  }
}
