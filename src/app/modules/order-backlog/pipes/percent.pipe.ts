import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percent'
})
export class PercentPipe implements PipeTransform {

  transform(part: number, total: number): number {
    return + ( ( part / total ) * 100).toFixed(0);
  }

}
