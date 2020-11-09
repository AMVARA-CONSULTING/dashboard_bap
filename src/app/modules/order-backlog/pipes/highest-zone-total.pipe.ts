import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterYearFn } from './filter-year.pipe';
import { SumQuantityFn } from './sum-quantity.pipe';

@Pipe({
  name: 'highestZoneTotal'
})
export class HighestZoneTotalPipe implements PipeTransform {

  transform(zones: KeyValue<string, any[]>[]): number {
    // Calculate highest current and previous year total of all zones
    // This value is used in graphic to know the bar height %
    // The maximum value should be the highest total (current/previous) of all given zones
    let highest = 0;
    zones.forEach(zone => {
      const totalCurrent = SumQuantityFn( FilterYearFn( zone.value, 'current' ) );
      const totalPrevious = SumQuantityFn( FilterYearFn( zone.value, 'previous' ) );
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
