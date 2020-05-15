import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'dip-circular-meters',
  templateUrl: './circular-meters.component.html',
  styleUrls: ['./circular-meters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DipCircularMetersComponent {

  constructor(
    public data: DataService
  ) { }

  @Input() actualValue: number;
  @Input() previousValue: number;

  @Input('actual') set setActual(value: number) {
    this.actual = isNaN(value) ? 0 : Math.abs(value)
    this.clockwise_actual = value >= 0
  }

  @Input('previous') set setPrevious(value: number) {
    this.previous = isNaN(value) ? 0 : Math.abs(value)
    this.clockwise_previous = value >= 0
  }

  clockwise_actual: boolean = false
  clockwise_previous: boolean = false

  actualNegative: boolean = false
  previousNegative: boolean = false

  actual: number = 0
  previous: number = 0

}
