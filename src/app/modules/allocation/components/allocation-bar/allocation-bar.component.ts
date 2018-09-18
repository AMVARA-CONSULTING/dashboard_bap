import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'allocation-bar',
  templateUrl: './allocation-bar.component.html',
  styleUrls: ['./allocation-bar.component.scss']
})
export class AllocationBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  allocation: number = 0
  program: number = 0

  @Input() partNumber: number
  @Input() programNumber: number

  @Input() ready: boolean

  @Input('allocation') set allocationSetter(value: number) {
    this.allocation = value
    console.log("Allocation", value)
  }

  @Input('program') set programSetter(value: number) {
    this.program = value
    console.log("Program", value)
  }

}
