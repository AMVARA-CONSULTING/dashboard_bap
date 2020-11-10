import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

@Pipe({
  name: 'startWith'
})
export class StartWithPipe implements PipeTransform {

  transform(originalValue: any, initialValue: any): Observable<any> {
    return of(originalValue).pipe(
      delay(0),
      startWith(initialValue)
    );
  }

}
