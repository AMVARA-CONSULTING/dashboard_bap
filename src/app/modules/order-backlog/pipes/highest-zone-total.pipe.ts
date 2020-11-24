import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { OrderBacklogDays } from '@other/interfaces';
import { OrderBacklogState } from '@store/order-backlog.state';
import { FilterDayFn } from './filter-day.pipe';
import { SumQuantityFn } from './sum-quantity.pipe';

@Pipe({
  name: 'highestZoneTotal'
})
export class HighestZoneTotalPipe implements PipeTransform {

  @SelectSnapshot(OrderBacklogState.GetLatestAndPreviousDay) days$ !: OrderBacklogDays;

  transform(zones: KeyValue<string, any[]>[]): number {
    // Calculate highest current and previous year total of all zones
    // This value is used in graphic to know the bar height %
    // The maximum value should be the highest total (current/previous) of all given zones
    let highest = 0;
    zones.forEach(zone => {
      const totalCurrent = SumQuantityFn( FilterDayFn( zone.value, 'current', this.days$ ) );
      const totalPrevious = SumQuantityFn( FilterDayFn( zone.value, 'previous', this.days$ ) );
      if (totalCurrent > highest) {
        highest = totalCurrent;
      }
      if (totalPrevious > highest) {
        highest = totalPrevious;
      }
    });
    return highest;
  }

}
