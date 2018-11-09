import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dip-quadro-circular-meters',
  templateUrl: './quadro-circular-meters.component.html',
  styleUrls: ['./quadro-circular-meters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DipQuadroCircularMetersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input('customer') set setCustomer(value: number) {
    this.customer = isNaN(value) ? 0 : Math.abs(value)
    this.clockwise_customer = value >= 0
  }

  @Input('plan') set setPlan(value: number) {
    this.plan = isNaN(value) ? 0 : Math.abs(value)
    this.clockwise_plan = value >= 0
  }

  @Input('total') set setTotal(value: number) {
    this.total = isNaN(value) ? 0 : Math.abs(value)
    this.clockwise_total = value >= 0
  }

  @Input('reserve') set setReserve(value: number) {
    this.reserve = isNaN(value) ? 0 : Math.abs(value)
    this.clockwise_reserve = value >= 0
  }

  @Input() customerValue: number = 0
  @Input() planValue: number = 0
  @Input() totalValue: number = 0
  @Input() reserveValue: number = 0

  clockwise_customer: boolean = false
  clockwise_plan: boolean = false
  clockwise_total: boolean = false
  clockwise_reserve: boolean = false

  customer: number = 0
  plan: number = 0
  total: number = 0
  reserve: number = 0

}
