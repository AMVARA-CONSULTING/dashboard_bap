import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from '@services/data.service';
import { swipeAnimation } from 'app/app.transitions';

@Component({
  selector: 'order-intake-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  animations: [swipeAnimation],
  host: {
    '[@routerTransition]': 'getLevel()'
  }
})
export class OrderIntakeWrapperComponent {

  constructor(private data: DataService) {
    data.lastTap, data.lastTap2 = null
  }

  @ViewChild('o', { static: true }) outlet: RouterOutlet

  getLevel() {
    this.data.currentLevel = +this.outlet.activatedRouteData['level']
    return this.outlet.activatedRouteData['level']
  }

}
