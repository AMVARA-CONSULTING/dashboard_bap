import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { Zones } from '@other/interfaces';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@services/data.service';
import { OrderIntakeHistoryState } from '@store/order-intake-history.state';
import { OrderIntakeHistoryRouter } from '../../services/order-intake-history-router.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs'
import { KeyValue } from '@angular/common';

@Component({
  selector: 'order-intake-history-main',
  templateUrl: './order-intake-history-main.component.html',
  styleUrls: ['./order-intake-history-main.component.scss'],
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
    '(swiperight)': '_data.goFrom("order_intake_history", $event)',
    '(swipeleft)': '_data.goFrom("order_intake_history", $event)'
  }
})
export class OrderIntakeHistoryMainComponent {
  @Select(OrderIntakeHistoryState.GetUniqueZones) zones$ !: Observable<Zones>;
  // Retrieve plan date
  @ViewSelectSnapshot(OrderIntakeHistoryState.GetPlanDate) plandate$ !: string;

  constructor(
    public _ac: ActivatedRoute,
    public _data: DataService,
    private config: ConfigService,
    private title: Title,
    public _obRouter: OrderIntakeHistoryRouter,
    private ref: ChangeDetectorRef
  ) {
    this.title.setTitle(this.config.config.appTitle + ' - Ecommerce evoluton');
  }

  trackfn(index, item: KeyValue<string, any[]>) {
    return item.key;
  }

}
