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
  ) {
    (window as any).ps_graphic = this;
    this.activatedRoute.paramMap.subscribe(params => {
      this.plant = params.get('plant')
    })
  }

  ready: boolean = false

  plant: string

  ngOnInit() {
  }

  @Input() werks: any[] = []

  ngOnChanges(changes: SimpleChanges) {
    if (this.werks.length > 0) {
      this.barsWidth = 100 / this.werks.length
      let total = 0
      this.werks.forEach(el => {
        const total_werk_actual = this.data.sumByIndex(el.value, this.config.config.reports.trucks.columns.plantStock.actual)
        const total_werk_previous = this.data.sumByIndex(el.value, this.config.config.reports.trucks.columns.plantStock.actual)
        if (total_werk_actual > total) total = total_werk_actual
        if (total_werk_previous > total) total = total_werk_previous
      })
      this.maxTotal = total
      setTimeout(() => this.ready = true, 300)
    }
  }

  goWerk(werk): void {
    this.router.navigate(['plant-stock', this.plant, 'werk', werk], { replaceUrl: true })
  }

  maxTotal: number = 0

  barsWidth: number = 0

}
