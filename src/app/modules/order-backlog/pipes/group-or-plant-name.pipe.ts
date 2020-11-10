import { Pipe, PipeTransform } from '@angular/core';
import { BacklogColumns } from '@other/interfaces';

@Pipe({
  name: 'groupOrPlantName'
})
export class GroupOrPlantNamePipe implements PipeTransform {

  // Get plant group name
  transform(values: any[], type: 'plant' | 'zone'): string {
    return values[0][type === 'zone' ? BacklogColumns.PlantGroupEnglish : BacklogColumns.PlantEnglish];
  }

}
