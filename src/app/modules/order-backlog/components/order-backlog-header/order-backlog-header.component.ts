import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'order-backlog-header',
  templateUrl: './order-backlog-header.component.html',
  styleUrls: ['./order-backlog-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderBacklogHeaderComponent {

  constructor(
    public _data: DataService
  ) { }

}
