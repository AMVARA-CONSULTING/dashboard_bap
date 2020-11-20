import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { OrderBacklogDays } from '@other/interfaces';
import { DataService } from '@services/data.service';
import { OrderBacklogState } from '@store/order-backlog.state';

@Component({
  selector: 'order-backlog-header',
  templateUrl: './order-backlog-header.component.html',
  styleUrls: ['./order-backlog-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderBacklogHeaderComponent {

  @ViewSelectSnapshot(OrderBacklogState.GetLatestAndPreviousDay) days$ !: OrderBacklogDays;

  constructor(
    public _data: DataService
  ) { }

  @Input() type: 'ranges' | 'day' = 'ranges';

}
