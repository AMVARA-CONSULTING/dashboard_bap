import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {

  // Shows the loading circle
  Show() : void {
    this.show = true
  }

  // Hides the loading circle
  Hide() : void {
    this.show = false
  }

  show: boolean = false
}
