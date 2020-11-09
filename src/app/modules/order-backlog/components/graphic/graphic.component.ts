import { Component } from '@angular/core';
import { trigger, transition, query, stagger, style, animate } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderBacklogState } from '@store/order-backlog.state';
import { Zones } from '@other/interfaces';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';

@Component({
  selector: 'order-backlog-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
  animations: [
    trigger('list', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('200ms', animate('300ms ease-in', style({ opacity: 1 }))), { optional: true })
      ])
    ])
  ]
})
export class OrderBacklogGraphicComponent {

  // Retrieve unique zones from Order Backlog State
  @ViewSelectSnapshot(OrderBacklogState.GetUniqueZones) zones$ !: Zones;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // CLick handler for going to clicked zone
  goZone(ZoneID): void {
    this.router.navigate(['zone', ZoneID], { relativeTo: this.route, replaceUrl: true });
  }

}
