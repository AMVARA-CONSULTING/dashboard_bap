import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { ApiService } from '@services/api.service';
import { LoadingService } from '@services/loading.service';
import { ConfigService } from '@services/config.service';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'order-intake-main',
  templateUrl: './order-intake-main.component.html',
  styleUrls: ['./order-intake-main.component.scss'],
  animations: [
    trigger('overview', [
      state('false', style({
        opacity: 0
      })),
      state('true', style({
        opacity: 1
      })),
      transition('* <=> *', animate('1000ms ease-in-out', style({ opacity: 1 })))
    ]),
    trigger('list', [
      transition('* => *', [
        query('.zone:enter', style({ opacity: 0 }), { optional: true }),
        query('.zone:enter', stagger('200ms', animate('300ms ease-in', style({ opacity: 1 }))), { optional: true })
      ])
    ])
  ],
  host: {
    '(swiperight)': 'data.go("plant-stock")',
    '(swipeleft)': 'data.go("production-program")'
  }
})
export class OrderIntakeMainComponent implements OnInit {

  constructor(
    public data: DataService,
    private api: ApiService,
    private loader: LoadingService,
    private config: ConfigService,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle(this.config.config.appTitle + ' - Order Intake')
  }

  ready: boolean = false

  plandate: string = ''

  ngOnInit() {
    this.loader.loading$.next(true)
    // If no Order Intake rows were found, get them
    if (this.data.orderIntakeData.length == 0) {
      this.api.getOrderIntakeData(this.config.config.reports[this.config.config.target][this.config.config.scenario].orderIntake).subscribe(res => {
        this.plandate = moment(res.data[0][11], 'MM/DD/YYYY').format(this.config.config.language == 'en' ? 'DD/MM/YYYY' : 'DD.MM.YYYY')
        this.data.orderIntakeData = res.data;
        (window as any).orderIntake = res.data
        this.rollupData()
        this.loader.loading$.next(false)
      })
    } else {
      this.plandate = moment(this.data.orderIntakeData[0][11], 'MM/DD/YYYY').format(this.config.config.language == 'en' ? 'DD/MM/YYYY' : 'DD.MM.YYYY')
      this.rollupData()
      this.loader.loading$.next(false)
    }
  }

  // Reduce data classifying zones and plants
  // In DOM we will do a cross-join with key-values
  rollupData() : void {
    this.rowGroups = this.data.classifyByIndex(this.data.orderIntakeData, 0)
    this.rowPlants = this.data.classifyByIndex(this.data.orderIntakeData, 1)
    this.rowKeys = Object.keys(this.rowGroups)
    // Tell the DOM it's ready to rock ’n’ roll !
    setTimeout(() => this.ready = true)
  }

  /** Reduce rows per Zone
   * @param ZoneID id of the selected zone
   */
  getPlantsByZone(ZoneID) {
    return Object.keys(this.rowGroups[ZoneID].reduce((r,a) => {
      r[a[1]] = r[a[1]] || []
      r[a[1]].push(a)
      return r
    }, {}))
  }

  /** Go to /order-intake/zone/:id
   * @param ZoneID id of the selected zone
   */
  goZone(ZoneID): void {
    this.data.lastTap = {
      type: 'zone',
      key: ZoneID
    }
    this.router.navigate(['order-intake','zone', ZoneID], { replaceUrl: true, queryParamsHandling: 'merge' })
  }

  /** Go to /order-intake/plant/:id
   * @param PlantID id of the selected plant
   */
  goPlant(PlantID): void {
    this.data.lastTap = {
      type: 'plant',
      key: PlantID
    }
    this.router.navigate(['order-intake', 'plant', PlantID], { replaceUrl: true, queryParamsHandling: 'merge' })
  }

  recoverLvl2(): void {
    if (this.data.lastTap != null) {
      if (this.data.lastTap.type == 'plant') {
        this.router.navigate(['order-intake', 'plant', this.data.lastTap.key], { replaceUrl: true, queryParamsHandling: 'merge' })
      } else {
        this.router.navigate(['order-intake', 'zone', this.data.lastTap.key], { replaceUrl: true, queryParamsHandling: 'merge' })
      }
    }
  }

  rowGroups: any
  rowKeys: any
  rowPlants: any

}
