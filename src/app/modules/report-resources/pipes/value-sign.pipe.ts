import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Pipe({
  name: 'valueSign'
})
export class ValueSignPipe implements PipeTransform {
  report: string;
  constructor(private _ac: ActivatedRoute) {
    this.report = this._ac.snapshot.data.title;
  }

  transform(value: any): string {
    if (this.report != 'order_intake_history' ) return '';
    return value ? 'Σ' : 'Ø';
  }

}
