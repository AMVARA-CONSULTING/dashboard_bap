import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { ReportTypes } from '@other/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { getPlanDateWithMoment } from '@other/functions';

@Component({
  selector: 'order-intake-main',
  templateUrl: './order-intake-main.component.html',
  styleUrls: ['./order-intake-main.component.scss'],
  animations: [
    trigger('list', [
      transition('* => *', [
        query('.zone:enter', style({ opacity: 0 }), { optional: true }),
        query('.zone:enter', stagger('200ms', animate('300ms ease-in', style({ opacity: 1 }))), { optional: true })
      ])
    ])
  ],
  host: {
    '(swiperight)': 'data.goFrom("order_intake", $event)',
    '(swipeleft)': 'data.goFrom("order_intake", $event)'
  }
})
export class OrderIntakeMainComponent implements OnInit {

  constructor(
    public data: DataService,
    private api: ApiService,
    private config: ConfigService,
    private router: Router,
    private title: Title,
    private translate: TranslateService
  ) {
    (window as any).moment = moment
    this.title.setTitle(this.config.config.appTitle + ' - ' + this.translate.instant('menu.order_intake'))
  }

  ready: boolean = false

  // Names of the routes for each level
  main_route: string = 'activity'
  general_route: string = 'zone'
  second_level_route: string = 'region'

  plandate: string = ''

  ngOnInit() {
    // If no Order Intake rows were found, get them
    if (this.data.orderIntakeData.length === 0) {
      this.api.getSavedReportData(ReportTypes.OrderIntake).subscribe(res => {
        this.plandate = getPlanDateWithMoment(res[0][11], moment, true);
        this.data.orderIntakeData = res;
        (window as any).orderIntake = res;
        this.rollupData()
      })
    } else {
      this.plandate = getPlanDateWithMoment(this.data.orderIntakeData[0][11], moment, true)
      this.rollupData()
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
      type: this.general_route,
      key: ZoneID
    }
    this.router.navigate([this.main_route,this.general_route, ZoneID], { replaceUrl: true, queryParamsHandling: 'merge' })
  }

  /** Go to /order-intake/plant/:id
   * @param PlantID id of the selected plant
   */
  goPlant(PlantID): void {
    this.data.lastTap = {
      type: this.second_level_route,
      key: PlantID
    }
    this.router.navigate([this.main_route, this.second_level_route, PlantID], { replaceUrl: true, queryParamsHandling: 'merge' })
  }

  recoverLvl2(): void {
    if (this.data.lastTap != null) {
      if (this.data.lastTap.type == this.second_level_route) {
        this.router.navigate([this.main_route, this.second_level_route, this.data.lastTap.key], { replaceUrl: true, queryParamsHandling: 'merge' })
      } else {
        this.router.navigate([this.main_route, this.general_route, this.data.lastTap.key], { replaceUrl: true, queryParamsHandling: 'merge' })
      }
    }
  }

  rowGroups: any
  rowKeys: any
  rowPlants: any

}
