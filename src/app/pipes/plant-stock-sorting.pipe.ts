import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'plantStockSorting'
})
export class PlantStockSortingPipe implements PipeTransform {

  @memo({ resolver: (...args: any[]): string => JSON.stringify(args) })
  transform(values: any[]): any[] {
    if (!values) return []
    if (values.length < 3) return values
    const a = values[1]
    const b = values[2]
    const c = values[0]
    return [a, b, c]
  }

}