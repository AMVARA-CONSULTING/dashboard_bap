import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dip-quadro-circular-meters',
  templateUrl: './quadro-circular-meters.component.html',
  styleUrls: ['./quadro-circular-meters.component.scss']
})
export class DipQuadroCircularMetersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  @Input('customer') set setCustomer(value: number) {
    this.customer = isNaN(value) ? 0 : Math.abs(value)
  }

  @Input('plan') set setPlan(value: number) {
    this.plan = isNaN(value) ? 0 : Math.abs(value)
  }

  @Input('total') set setTotal(value: number) {
    this.total = isNaN(value) ? 0 : Math.abs(value)
  }

  @Input('reserve') set setReserve(value: number) {
    this.reserve = isNaN(value) ? 0 : Math.abs(value)
  }

  clockwise_actual: boolean = false
  clockwise_previous: boolean = false

  customer: number = 0
  plan: number = 0
  total: number = 0
  reserve: number = 0

}
