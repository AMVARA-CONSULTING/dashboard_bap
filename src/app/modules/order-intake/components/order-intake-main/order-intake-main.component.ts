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
  /*host: {
    '(swipeleft)': "recoverLvl2()"
  }*/
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
    title.setTitle('DIP - Order Intake')
  }

  ready: boolean = false

  plandate: string = ''

  ngOnInit() {
    this.loader.Show()
    // If no Order Intake rows were found, get them
    if (this.data.orderIntakeData.length == 0) {
      this.api.getOrderIntakeData().subscribe(data => {
        this.plandate = moment(data[0][11], 'MM/DD/YYYY').format(this.config.config.language == 'en' ? 'DD/MM/YYYY' : 'DD.MM.YYYY')
        this.data.orderIntakeData = data
        // Transform numeric values to real numeric values, also checking NaN or null
        this.data.orderIntakeData.forEach((row, index, rows) => {
          rows[index][12] = isNaN(rows[index][12]) ? 0 : parseFloat(rows[index][12])
          rows[index][13] = isNaN(rows[index][13]) ? 0 : parseFloat(rows[index][13])
        })
        this.rollupData()
        this.loader.Hide()
      })
    } else {
      this.plandate = moment(this.data.orderIntakeData[0][11], 'MM/DD/YYYY').format(this.config.config.language == 'en' ? 'DD/MM/YYYY' : 'DD.MM.YYYY')
      this.rollupData()
      this.loader.Hide()
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
    this.router.navigate(['order-intake','zone', ZoneID])
  }

  /** Go to /order-intake/plant/:id
   * @param PlantID id of the selected plant
   */
  goPlant(PlantID): void {
    this.data.lastTap = {
      type: 'plant',
      key: PlantID
    }
    this.router.navigate(['order-intake', 'plant', PlantID])
  }

  recoverLvl2(): void {
    if (this.data.lastTap != null) {
      if (this.data.lastTap.type == 'plant') {
        this.router.navigate(['order-intake', 'plant', this.data.lastTap.key])
      } else {
        this.router.navigate(['order-intake', 'zone', this.data.lastTap.key])
      }
    }
  }

  rowGroups: any
  rowKeys: any
  rowPlants: any

}
