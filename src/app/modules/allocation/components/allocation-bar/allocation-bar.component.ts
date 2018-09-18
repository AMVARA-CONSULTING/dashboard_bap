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

  part: number = 0

  @Input() partNumber: number

  @Input() ready: boolean

  @Input('part') set partSetter(value: number) {
    this.part = value
    console.log(value)
  }

}
