import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  level: number;

  constructor(
    public _data: DataService,
    private _ac: ActivatedRoute
  ) {
    this.level = this._ac.snapshot.data.level;
  }

}
