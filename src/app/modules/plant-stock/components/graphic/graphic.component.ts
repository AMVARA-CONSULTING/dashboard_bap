import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { ToolsService } from '@services/tools.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@services/data.service';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'plant-stock-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
  animations: [
    trigger('list', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('200ms', animate('300ms ease-in', style({ opacity: 1 }))), { optional: true })
      ])
    ])
  ]
})
export class GraphicComponent implements OnInit, OnChanges {

  constructor(
    public config: ConfigService,
    public tools: ToolsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public data: DataService
  ) { }

  ready: boolean = false

  ngOnInit() {
  }

  @Input() werks: any

  ngOnChanges(changes: SimpleChanges) {
    if (changes.werks.currentValue) {
      this.barsWidth = 100 / Object.keys(changes.werks.currentValue).length
      let total = 0
      for (let werk in changes.werks.currentValue) {
        const total_werk_actual = this.data.sumByIndex(changes.werks.currentValue[werk], this.config.config.reports.trucks.columns.plantStock.actual)
        const total_werk_previous = this.data.sumByIndex(changes.werks.currentValue[werk], this.config.config.reports.trucks.columns.plantStock.actual)
        if (total_werk_actual > total) total = total_werk_actual
        if (total_werk_previous > total) total = total_werk_previous
      }
      this.maxTotal = total
      this.werks = Object.assign({}, changes.werks.currentValue)
      setTimeout(() => this.ready = true, 300)
    }
  }

  getCount() : number {
    return Object.keys(this.werks || {}).length
  }

  goWerk(werk) : void {
    this.router.navigate(['werk', encodeURI(werk)], { relativeTo: this.activatedRoute, replaceUrl: true })
  }

  maxTotal: number = 0

  barsWidth: number = 0

}
