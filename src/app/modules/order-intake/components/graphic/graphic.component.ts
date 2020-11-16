import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '@services/data.service';
import { ConfigService } from '@services/config.service';
import { trigger, transition, query, stagger, style, animate } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'order-intake-graphic',
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
export class GraphicComponent implements OnChanges {

  constructor(
    public _data: DataService,
    private config: ConfigService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    (window as any).oi_graphic = this;
  }

  ready: boolean = false

  @Input() data: any[][]

  ngOnChanges(changes: SimpleChanges) {
    this.zoneKeys = []
    let zones = changes.data.currentValue.reduce((r, a) => {
      r[a[0]] = r[a[0]] || []
      r[a[0]].push(a)
      return r
    }, {})
    for (var zone in zones) {
      this.zones[zone] = {
        title: zones[zone][0][this.config.config.reports.trucks.columns.orderIntake.groupName[this.config.config.language]],
        actual: parseInt(this._data.sumByIndex(zones[zone], 12)),
        previous: parseInt(this._data.sumByIndex(zones[zone], 13)),
      }
    }
    this.rows = this._data.classifyByIndex(this._data.orderIntakeData, 0)
    let tActual = 0
    for (var zone in this.zones) {
      if (this.zones[zone].actual > tActual) tActual = this.zones[zone].actual
      if (this.zones[zone].previous > tActual) tActual = this.zones[zone].previous
    }
    this.maxTotal = tActual
    for (var zone in this.zones) {
      let percent1 = (this.zones[zone].actual * 100) / tActual
      let percent2 = (this.zones[zone].previous * 100) / tActual
      this.zones[zone].percentActual = (parseInt(percent1.toString()) == 0 ? 1 : percent1).toFixed(0)
      this.zones[zone].percentPrevious = (parseInt(percent2.toString()) == 0 ? 1 : percent2).toFixed(0)
    }
    this.zoneKeys = Object.keys(this.zones)
    this.barsWidth = 100 / Object.keys(this.zones).length
    setTimeout(() => this.ready = true, 300)
  }

  goZone(ZoneID): void {
    this.router.navigate(['zone', ZoneID], { relativeTo: this.route, replaceUrl: true })
  }

  rows: any[][] = []

  zones: any = {}
  zoneKeys: string[] = []

  maxTotal: number = 0

  barsWidth: number = 0

}
