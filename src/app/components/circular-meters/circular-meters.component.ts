import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dip-circular-meters',
  templateUrl: './circular-meters.component.html',
  styleUrls: ['./circular-meters.component.scss']
})
export class DipCircularMetersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() actualValue : number
  @Input() previousValue : number

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

  actual: number = 0
  previous: number = 0

}
