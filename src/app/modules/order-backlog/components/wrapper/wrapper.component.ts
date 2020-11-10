import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from '@services/data.service';
import { swipeAnimation } from 'app/app.transitions';

@Component({
  selector: 'order-backlog-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  animations: [swipeAnimation],
  host: {
    '[@routerTransition]': 'getLevel()'
  }
})
export class OrderBacklogWrapperComponent {

  @ViewChild('o', { static: true }) outlet: RouterOutlet;

  constructor( private data: DataService ) {
    data.lastTap = null;
    data.lastTap2 = null;
  }

  getLevel() {
    this.data.currentLevel = +this.outlet.activatedRouteData['level'];
    return this.outlet.activatedRouteData['level'];
  }

}
