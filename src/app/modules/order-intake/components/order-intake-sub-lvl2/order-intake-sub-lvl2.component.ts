import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@services/data.service';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { ReportTypes } from '@other/interfaces';
import { getPlanDateWithMoment } from '@other/functions';

@Component({
  selector: 'order-intake-sub-lvl2',
  templateUrl: './order-intake-sub-lvl2.component.html',
  styleUrls: ['./order-intake-sub-lvl2.component.scss'],
  host: {
    '(swiperight)': 'data.goFrom("order_intake", $event)',
    '(swipeleft)': 'data.goFrom("order_intake", $event)'
  }
})
export class OrderIntakeSubLvl2Component {

  ZoneID: any = null
  PlantID: any = null

  plandate: string = ''

  ready: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    public data: DataService,
    private api: ApiService,
    private config: ConfigService,
    private router: Router,
    private title: Title
  ) {
    title.setTitle(this.config.config.appTitle + ' - Order Intake')
    // Show the loader while getting/loading the data
    this.activatedRoute.params.subscribe(params => {
      if (params.type == 'zone') {
        this.ZoneID = params.id
      } else {
        this.PlantID = params.id
      }
      // If no Order Intake rows were found, get them
      if (this.data.orderIntakeData.length === 0) {
        this.api.getSavedReportData(ReportTypes.OrderIntake).subscribe(res => {
          this.plandate = getPlanDateWithMoment(res[0][11], moment, true);
          this.data.orderIntakeData = res;
          try {
            this.rollupData()
          } catch (err) {
            this.router.navigate(['order-intake'], { replaceUrl: true })
          }
        })
      } else {
        this.plandate = getPlanDateWithMoment(this.data.orderIntakeData[0][11], moment, true)
        try {
          this.rollupData()
        } catch (err) {
          this.router.navigate(['order-intake'], { replaceUrl: true })
        }
      }
    })
  }

  groupInfo: any

  rollupData(): void {
    let rows
    // Reduce rows depending on route, by Plant or by Zone
    if (this.ZoneID != null) {
      rows = this.data.classifyByIndex(this.data.orderIntakeData, 0)[this.ZoneID]
    } else {
      rows = this.data.classifyByIndex(this.data.orderIntakeData, 1)[this.PlantID]
    }
    // Gettings rows only for the zone selected
    let zoneRows = this.data.orderIntakeData.reduce((r, a) => {
      r[a[this.config.config.reports.trucks.columns.orderIntake.groupKey]] = r[a[this.config.config.reports.trucks.columns.orderIntake.groupKey]] || []
      r[a[this.config.config.reports.trucks.columns.orderIntake.groupKey]].push(a)
      return r
    }, {})[rows[0][this.config.config.reports.trucks.columns.orderIntake.groupKey]]
    // Getting rows only for the plant selected
    let plantRows = this.data.orderIntakeData.reduce((r, a) => {
      r[a[this.config.config.reports.trucks.columns.orderIntake.plantKey]] = r[a[this.config.config.reports.trucks.columns.orderIntake.plantKey]] || []
      r[a[this.config.config.reports.trucks.columns.orderIntake.plantKey]].push(a)
      return r
    }, {})[rows[0][this.config.config.reports.trucks.columns.orderIntake.plantKey]]
    // Collect data info for data headers
    this.groupInfo = {
      zone: this.ZoneID != null,
      zoneRows: zoneRows,
      plantRows: plantRows,
      rowsPlain: rows,
      zoneID: rows[0][this.config.config.reports.trucks.columns.orderIntake.groupKey],
      plantID: rows[0][this.config.config.reports.trucks.columns.orderIntake.plantKey],
      totalActual: this.data.sumByIndex(this.data.orderIntakeData, 12),
      totalPrevious: this.data.sumByIndex(this.data.orderIntakeData, 13),
      zoneTitle: rows[0][this.config.config.reports.trucks.columns.orderIntake.groupName[this.config.config.language]],
      plantTitle: rows[0][this.config.config.reports.trucks.columns.orderIntake.plantName[this.config.config.language]],
      zoneActual: this.data.sumByIndex(zoneRows, this.config.config.reports.trucks.columns.orderIntake.actual),
      zonePrevious: this.data.sumByIndex(zoneRows, this.config.config.reports.trucks.columns.orderIntake.previous),
      plantActual: this.data.sumByIndex(plantRows, this.config.config.reports.trucks.columns.orderIntake.actual),
      plantPrevious: this.data.sumByIndex(plantRows, this.config.config.reports.trucks.columns.orderIntake.previous),
      regions: this.data.classifyByIndex(rows, this.config.config.reports.trucks.columns.orderIntake.region[this.config.config.language]),
      products: this.data.classifyByIndex(rows, this.config.config.reports.trucks.columns.orderIntake.product[this.config.config.language])
    }
    this.title.setTitle(this.config.config.appTitle + ' - Order Intake - ' + (this.ZoneID != null ? this.groupInfo.zoneTitle : this.groupInfo.plantTitle))
    this.groupInfo.regionKeys = Object.keys(this.groupInfo.regions)
    this.groupInfo.productKeys = Object.keys(this.groupInfo.products)
    this.groupInfo.progressValue1 = this.ZoneID != null ? this.groupInfo.zoneActual : this.groupInfo.plantActual
    this.groupInfo.progressValue2 = this.ZoneID != null ? this.groupInfo.zonePrevious : this.groupInfo.plantPrevious
    this.groupInfo.progress1 = this.ZoneID != null ?
      this.percent(this.groupInfo.zoneActual, this.groupInfo.totalActual) :
      this.percent(this.groupInfo.plantActual, this.groupInfo.zoneActual)
    this.groupInfo.progress2 = this.ZoneID != null ?
      this.percent(this.groupInfo.zonePrevious, this.groupInfo.totalPrevious) :
      this.percent(this.groupInfo.plantPrevious, this.groupInfo.zonePrevious)

    // Tell the DOM it's ready to rock ’n’ roll !
    setTimeout(() => this.ready = true)
  }

  percent(part: number, total: number): number {
    return parseInt(((part * 100) / total).toFixed(0))
  }

  return(): void {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute })
  }

  forward(): void {
    if (this.data.lastTap2) {
      if (this.data.lastTap2.type == 'region') {
        this.router.navigate(['region', this.data.lastTap2.key], { relativeTo: this.activatedRoute, replaceUrl: true })
      } else {
        this.router.navigate(['product', this.data.lastTap2.key], { relativeTo: this.activatedRoute, replaceUrl: true })
      }
    }
  }

  goProduct(ProductID): void {
    this.data.lastTap = {
      type: 'region',
      key: encodeURI(ProductID)
    }
    this.router.navigate(['region', encodeURI(ProductID)], { relativeTo: this.activatedRoute })
  }

  goRegion(RegionID): void {
    this.data.lastTap = {
      type: 'product',
      key: encodeURI(RegionID)
    }
    this.router.navigate(['product', encodeURI(RegionID)], { relativeTo: this.activatedRoute })
  }

}
