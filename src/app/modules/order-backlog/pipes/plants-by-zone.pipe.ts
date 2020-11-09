import { Pipe, PipeTransform } from '@angular/core';
import { classifyByProperty } from '@other/functions';
import { BacklogColumns } from '@other/interfaces';

@Pipe({
  name: 'plantsByZone'
})
export class PlantsByZonePipe implements PipeTransform {

  // Get available plants inside zone
  transform = (values: any[]) => classifyByProperty(values, BacklogColumns.SortKey_Plant);

}
