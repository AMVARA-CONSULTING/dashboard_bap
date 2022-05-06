import { DataService } from './../../../../services/data.service';
import { Component, Input } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
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
export class GraphicComponent {

  constructor(
    public _data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe(params => this.plantID = params.get('plant'));
  }

  plantID: string;

  getIndex(index) {
    return index
  }

  goMonth(date): void {
    const momentum = moment(date, 'MM / YYYY');
    const year = momentum.format('YYYYMM');
    this.router.navigate(['covid', this.plantID, 'date', year]);
  }

  width: number = 0

  ready: boolean = false

  maxNumber: number = 0

  months = []

  shouldRotate: boolean = false

  @Input('months') set monthsSetter(values) {
    const maxs = values.map(item => item.program)
    this.maxNumber = Math.max(...maxs)
    this.months = values
    const count = values.length
    this.width = 100 / count
    this.shouldRotate = this.width < 20
    setTimeout(() => this.ready = true, 300)
  }

}
