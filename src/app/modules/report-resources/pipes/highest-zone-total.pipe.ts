import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { OrderBacklogDays } from '@other/interfaces';
import { OrderBacklogState } from '@store/order-backlog.state';
import { OrderIntakeHistoryState } from '@store/order-intake-history.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterDayFn } from './filter-day.pipe';
import { SumQuantityFn } from './sum-quantity.pipe';

@Pipe({
  name: 'highestZoneTotal'
})
export class HighestZoneTotalPipe implements PipeTransform {
  
  days$: Observable<OrderBacklogDays>;
  report: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _store: Store
  ) {
    // get the report that user is viewing currently
    this.report = this.activatedRoute.snapshot.data.title;
    let method: any;

    switch(this.report) {
      case 'order_intake_history':
        method = OrderIntakeHistoryState.GetLatestAndPreviousDay
        break;
      case 'order_backlog':
      default:
        method = OrderBacklogState.GetLatestAndPreviousDay
        break;
    }
    // Retrieves days from Store State
    this.days$ = this._store.select(method);
  }

  transform(zones: KeyValue<string, any[]>[]): Observable<number> {
    return this.days$.pipe(
      map(days => {
        // Calculate highest current and previous year total of all zones
        // This value is used in graphic to know the bar height %
        // The maximum value should be the highest total (current/previous) of all given zones
        let highest = 0;
        zones.forEach(zone => {
          const totalCurrent = SumQuantityFn( FilterDayFn( zone.value, 'current', days, this.report ), this.report );
          const totalPrevious = SumQuantityFn( FilterDayFn( zone.value, 'previous', days, this.report ), this.report );
          if (totalCurrent > highest) {
            highest = totalCurrent;
          }
          if (totalPrevious > highest) {
            highest = totalPrevious;
          }
        });
        return highest;
      })
    )
  }

}
