import { Injectable } from '@angular/core';
import { DataService } from '@services/data.service';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AccessGranted implements CanActivate {

  constructor (
    private data: DataService,
    private router: Router
  ) {}

  canActivate () : boolean {
    if (!this.data.accessGranted) this.router.navigate(['miami-access'])
    return this.data.accessGranted
  }
}
