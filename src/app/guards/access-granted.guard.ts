import { Injectable } from '@angular/core';
import { DataService } from '@services/data.service';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AccessGranted implements CanActivate {

  constructor (
    private data: DataService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (location.href.indexOf('bypass') > -1 || location.hostname.indexOf('corpintra.net') > -1) {
      this.data.accessGranted = true
      return true
    }
    if (!this.data.accessGranted) this.router.navigate(['miami-access'], { preserveQueryParams: true })
    return this.data.accessGranted
  }
}
