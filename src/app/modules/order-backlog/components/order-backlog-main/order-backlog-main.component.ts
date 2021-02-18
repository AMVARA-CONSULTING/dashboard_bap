import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { OrderBacklogState } from 'app/store/order-backlog.state';
import { Zones } from '@other/interfaces';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { OrderBacklogRouter } from '@modules/order-backlog/services/order-backlog-router.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'order-backlog-main',
  templateUrl: './order-backlog-main.component.html',
  styleUrls: ['./order-backlog-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('list', [
      transition('0 => *', [
        query('.zone:enter', style({ opacity: 0 }), { optional: true }),
        query('.zone:enter', stagger('200ms', animate('300ms ease-in', style({ opacity: 1 }))), { optional: true })
      ])
    ])
  ],
  host: {
    '(swiperight)': '_data.goFrom("order_backlog", $event)',
    '(swipeleft)': '_data.goFrom("order_backlog", $event)'
  }
})
export class OrderBacklogMainComponent {

  // Retrieve unique zones from Order Backlog State
  @ViewSelectSnapshot(OrderBacklogState.GetUniqueZones) zones$ !: Zones;
  // Retrieve plan date
  @ViewSelectSnapshot(OrderBacklogState.GetPlanDate) plandate$ !: string;

  constructor(
    public _ac: ActivatedRoute,
    public _data: DataService,
    private config: ConfigService,
    private title: Title,
    private translate: TranslateService,
    public _obRouter: OrderBacklogRouter
  ) {
    this.title.setTitle(this.config.config.appTitle + ' - ' + this.translate.instant('menu.order_backlog'));
  }

}
