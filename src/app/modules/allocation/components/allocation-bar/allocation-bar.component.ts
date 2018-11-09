import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'allocation-bar',
  templateUrl: './allocation-bar.component.html',
  styleUrls: ['./allocation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllocationBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  allocation: number = 0
  program: number = 0
  zero: boolean = false

  @Input() partNumber: number
  @Input() programNumber: number

  @Input() ready: boolean

  @Input('allocation') set allocationSetter(value: number) {
    this.allocation = value >= 100 ? 100 : value
    this.zero = (isNaN(this.allocation) || this.allocation == 0) && this.program == 0
  }

  @Input('program') set programSetter(value: number) {
    this.program = value
    this.zero = (isNaN(this.allocation) || this.allocation == 0) && this.program == 0
  }

}
