import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { DataService } from '@services/data.service';
import { OrderBacklog } from '@store/order-backlog.state';
import { OrderIntakeHistory } from '@store/order-intake-history.state';
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
export class ReportWrapperComponent implements OnInit {

  @ViewChild('o', { static: true }) outlet: RouterOutlet;

  constructor(
    private data: DataService,
    private _store: Store,
    private _router: ActivatedRoute
  ) {
    data.lastTap = null;
    data.lastTap2 = null;
  }

  ngOnInit() {
    let report = this._router.snapshot.data.title;
    switch(report){
      case 'order_intake_history':
        // Get Order Intake History Data
        this._store.dispatch( new OrderIntakeHistory.Get() );
        break;
      case 'order_backlog':
      // Get Order Backlog Data
      this._store.dispatch( new OrderBacklog.Get() );
      break;
      default:
      // Get Order Intake History Data
      this._store.dispatch( new OrderIntakeHistory.Get() );
      break;
        
    }
  }

  getLevel() {
    this.data.currentLevel = +this.outlet.activatedRouteData['level'];
    return this.outlet.activatedRouteData['level'];
  }

}
