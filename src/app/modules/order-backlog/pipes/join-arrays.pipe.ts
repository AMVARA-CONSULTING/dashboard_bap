import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinArrays'
})
export class JoinArraysPipe implements PipeTransform {

  transform(): any[] {
    const arrays = [];
    for (let i = 0; i < arguments.length; i++) {
      arrays.push(arguments[i] || []);
    }
    return arrays.flat();
  }

}
