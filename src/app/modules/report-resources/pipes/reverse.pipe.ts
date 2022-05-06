import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(array: any[]): any[] {
    return [ ...array ].reverse();
  }

}
