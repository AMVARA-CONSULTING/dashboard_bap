import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {

  // Shows the loading circle
  public Show() : void {
    this.show = true
  }

  // Hides the loading circle
  public Hide() : void {
    this.show = false
  }

  public show: boolean = false
}
