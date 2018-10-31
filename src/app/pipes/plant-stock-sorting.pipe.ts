import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '@services/api.service';

@Pipe({
  name: 'plantStockSorting'
})
export class PlantStockSortingPipe implements PipeTransform {

  constructor(
    private api: ApiService
  ) {}

  transform(values: any[]): any[] {
    console.log(values)
    if (this.api.corpintra) {
      return values.sort((a,b) => {
        switch(b.key) {
          case "Inside plant":
          case "Garden":
            return 1
          case "Outside plant":
          case "Basement":
            return 0
          case "Bodybuilder":
          case "Housebuilder":
            return -1
        }
      })
    } else {
      return values
    }
  }

}
