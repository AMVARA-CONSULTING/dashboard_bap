import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DataService } from '@services/data.service';
import { ConfigService } from '@services/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'production-program-graphic',
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
export class GraphicComponent implements OnInit {

  constructor(
    public _data: DataService,
    private config: ConfigService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ready: boolean = false

  ngOnInit() {
  }

  @Input() data: any[][]
  @Input() year: string

  ngOnChanges(changes: SimpleChanges) {
    this.zoneKeys = []
    const myData = changes.data ? changes.data.currentValue : this.data
    const myYear = changes.year ? changes.year.currentValue : this.year
    let zones = myData.filter(item => item[13] == myYear).reduce((r,a) => {
      r[a[0]] = r[a[0]] || []
      r[a[0]].push(a)
      return r
    }, {})
    this.zones = []
    this.maxReserve = 0
    for (var zone in zones) {
      this.zones[zone] = {
        title: zones[zone][0][(this.config.config.language == 'en' ? 1 : 2)],
        actual: parseInt(this._data.sumByIndex(zones[zone], 15)),
        previous: parseInt(this._data.sumByIndex(zones[zone], 17)),
        reserve: parseInt(this._data.sumByIndex(zones[zone], 22))
      }
      if (this.zones[zone].reserve > this.maxReserve) this.maxReserve = this.zones[zone].reserve
    }
    this.rows = this._data.classifyByIndex(this._data.productionProgramData.filter(item => item[13] == myYear), 0)
    let tActual = 0
    for (var zone in this.zones) {
      if (this.zones[zone].actual > tActual) tActual = this.zones[zone].actual
      if (this.zones[zone].previous > tActual) tActual = this.zones[zone].previous
      if (this.zones[zone].reserve > tActual) tActual = this.zones[zone].reserve
    }
    this.maxTotal = tActual
    for (var zone in this.zones) {
      let percent1 = (this.zones[zone].actual * 100) / tActual
      let percent2 = (this.zones[zone].previous * 100) / tActual
      let percent3 = (this.zones[zone].reserve * 100) / this.maxTotal
      this.zones[zone].percentActual = (parseInt(percent1.toString()) == 0 ? 1 : percent1).toFixed(0)
      this.zones[zone].percentPrevious = (parseInt(percent2.toString()) == 0 ? 1 : percent2).toFixed(0)
      this.zones[zone].percentReserve = (parseInt(percent3.toString()) == 0 ? 1 : percent3).toFixed(0)
    }
    this.zoneKeys = Object.keys(this.zones)
    this.barsWidth = 100 / Object.keys(this.zones).length
    setTimeout(() => this.ready = true, 300)
  }

  goZone(ZoneID) : void {
    this.router.navigate(['zone', ZoneID], { relativeTo: this.route, replaceUrl: true })
  }

  rows: any[][] = []

  zones: any = {}
  zoneKeys: string[] = []

  maxTotal: number = 0
  maxReserve: number = 0

  barsWidth: number = 0

}
