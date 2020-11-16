import { Pipe, PipeTransform } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { BacklogColumns, ILanguage } from '@other/interfaces';
import { ConfigState } from '@store/config.state';

@Pipe({
  name: 'groupOrPlantName'
})
export class GroupOrPlantNamePipe implements PipeTransform {

  @SelectSnapshot(ConfigState.GetLanguageHuman) language: ILanguage;

  // Get plant group name
  transform(values: any[], type: 'plant' | 'zone'): string {
    return values[0][type === 'zone' ? BacklogColumns[`PlantGroup${this.language}`] : BacklogColumns[`Plant${this.language}`]];
  }

}
