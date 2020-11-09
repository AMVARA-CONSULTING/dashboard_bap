import { Component } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { OrderBacklogState } from 'app/store/order-backlog.state';
import { Zones } from '@other/interfaces';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { DataService } from '@services/data.service';

@Component({
  selector: 'order-backlog-main',
  templateUrl: './order-backlog-main.component.html',
  styleUrls: ['./order-backlog-main.component.scss'],
  animations: [
    trigger('overview', [
      transition('* <=> *', animate('1000ms ease-in-out', style({ opacity: 1 })))
    ]),
    trigger('list', [
      transition('0 => *', [
        query('.zone:enter', style({ opacity: 0 }), { optional: true }),
        query('.zone:enter', stagger('200ms', animate('300ms ease-in', style({ opacity: 1 }))), { optional: true })
      ])
    ])
  ],
  host: {
    '(swiperight)': 'data.go("order-intake")',
    '(swipeleft)': 'data.go("production-program")'
  }
})
export class OrderBacklogMainComponent {

  // Retrieve unique zones from Order Backlog State
  @ViewSelectSnapshot(OrderBacklogState.GetUniqueZones) zones$ !: Zones;
  // Retrieve plan date
  @ViewSelectSnapshot(OrderBacklogState.GetPlanDate) plandate$ !: string;

  constructor(
    private _data: DataService,
    private config: ConfigService,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle(this.config.config.appTitle + ' - Order Backlog');
  }

  ready; // FIXME: Animation

  /** Go to /order-backlog/zone/:id
   * @param ZoneID id of the selected zone
   */
  goZone(ZoneID): void {
    this._data.lastTap = {
      type: 'zone',
      key: ZoneID
    };
    this.router.navigate(['order-backlog', 'zone', ZoneID], { replaceUrl: true, queryParamsHandling: 'merge' });
  }

  /** Go to /order-backlog/plant/:id
   * @param PlantID id of the selected plant
   */
  goPlant(PlantID): void {
    this._data.lastTap = {
      type: 'plant',
      key: PlantID
    };
    this.router.navigate(['order-backlog', 'plant', PlantID], { replaceUrl: true, queryParamsHandling: 'merge' });
  }

  recoverLvl2(): void {
    if (this._data.lastTap != null) {
      if (this._data.lastTap.type === 'plant') {
        this.router.navigate(['order-backlog', 'plant', this._data.lastTap.key], { replaceUrl: true, queryParamsHandling: 'merge' });
      } else {
        this.router.navigate(['order-backlog', 'zone', this._data.lastTap.key], { replaceUrl: true, queryParamsHandling: 'merge' });
      }
    }
  }

}
