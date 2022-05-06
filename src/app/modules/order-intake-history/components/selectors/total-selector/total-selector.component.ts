import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderIntakeHistory, OrderIntakeHistoryState } from '@store/order-intake-history.state';

@Component({
  selector: 'dip-total-selector',
  templateUrl: './total-selector.component.html',
  styleUrls: ['./total-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalSelectorComponent {

  @Select(OrderIntakeHistoryState.GetShowTotal) showTotal$: Observable<boolean>;

  constructor(
    private _store: Store
  ) { }

  valueChanged(value: string) {
    let total = value == "total";
    this._store.dispatch(new OrderIntakeHistory.SetShowTotal(total))
    localStorage.setItem('intake_history_show_total', total.toString());
  }

}
