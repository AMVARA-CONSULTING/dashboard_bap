import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { DataService } from '@services/data.service';
import { OrderBacklog } from '@store/order-backlog.state';
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
export class OrderBacklogWrapperComponent implements OnInit {

  @ViewChild('o', { static: true }) outlet: RouterOutlet;

  constructor(
    private data: DataService,
    private _store: Store
  ) {
    data.lastTap = null;
    data.lastTap2 = null;
  }

  ngOnInit() {
    // Get Order Backlog Data
    this._store.dispatch( new OrderBacklog.Get() );
  }

  getLevel() {
    this.data.currentLevel = +this.outlet.activatedRouteData['level'];
    return this.outlet.activatedRouteData['level'];
  }

}
