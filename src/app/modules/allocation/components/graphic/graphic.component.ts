import { Component, Input } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import * as moment from 'moment';

@Component({
  selector: 'allocation-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
  animations: [
    trigger('list', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('100ms', animate('400ms ease-in-out', style({ opacity: 1 }))), { optional: true })
      ])
    ])
  ],
  host: {
    '[@list]': 'months.length'
  }
})
export class GraphicComponent{

  constructor() { }

  ngOnInit() {
  }

  getIndex(index, item) {
    return index
  }

  width: number = 0

  ready: boolean = false

  maxNumber: number = 0

  months = []

  @Input('months') set monthsSetter(values) {
    const maxs = values.map(item => item.program)
    this.maxNumber = Math.max(...maxs)
    this.months = values
    const count = values.length
    this.width = 100 / count
    setTimeout(() => this.ready = true, 300)
  }

}
