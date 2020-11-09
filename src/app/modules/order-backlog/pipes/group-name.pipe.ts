import { Pipe, PipeTransform } from '@angular/core';
import { BacklogColumns } from '@other/interfaces';

@Pipe({
  name: 'groupName'
})
export class GroupNamePipe implements PipeTransform {

  // Get plant group name
  transform(values: any[]): string {
    return values[0][BacklogColumns.PlantGroupEnglish];
  }

}
