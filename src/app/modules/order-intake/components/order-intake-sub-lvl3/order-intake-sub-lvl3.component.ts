import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
import { DataService } from '@services/data.service';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { ReportTypes } from '@other/interfaces';
import { getPlanDateWithMoment } from '@other/functions';

@Component({
  selector: 'order-intake-sub-lvl3',
  templateUrl: './order-intake-sub-lvl3.component.html',
  styleUrls: ['./order-intake-sub-lvl3.component.scss'],
  host: {
    '(swiperight)': 'data.goFrom("order_intake", $event)',
    '(swipeleft)': 'data.goFrom("order_intake", $event)'
  }
})
export class OrderIntakeSubLvl3Component {

  ZoneID: any = null
  PlantID: any = null

  RegionID: any = null
  ProductID: any = null

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
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('type') == 'zone') {
        this.ZoneID = params.get('id')
        this.PlantID = null
      } else {
        this.PlantID = params.get('id')
        this.ZoneID = null
      }
      try {
        if (params.get('type2') == 'region') {
          this.RegionID = decodeURI(params.get('region_id'))
          this.ProductID = null
        } else {
          this.ProductID = decodeURI(params.get('region_id'))
          this.RegionID = null
        }
      } catch (err) {
        this.router.navigate(['order-intake'], { replaceUrl: true })
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
        this.plandate = getPlanDateWithMoment(this.data.orderIntakeData[0][11], moment, true);
        try {
          this.rollupData();
        } catch (err) {
          this.router.navigate(['order-intake'], { replaceUrl: true });
        }
      }
    });
  }

  goAnother(key): void {
    if (this.RegionID != null) {
      this.router.navigate(['../../', 'product', encodeURI(key)], { relativeTo: this.activatedRoute, replaceUrl: true });
    } else {
      this.router.navigate(['../../', 'region', encodeURI(key)], { relativeTo: this.activatedRoute, replaceUrl: true });
    }
  }

  groupInfo: any;

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
    }
    if (this.RegionID != null) {
      this.subRows = this.data.classifyByIndex(rows, this.config.config.reports.trucks.columns.orderIntake.region[this.config.config.language])[this.RegionID]
    } else {
      this.subRows = this.data.classifyByIndex(rows, this.config.config.reports.trucks.columns.orderIntake.product[this.config.config.language])[this.ProductID]
    }
    this.title.setTitle(this.config.config.appTitle + ' - Order Intake - ' + (this.ZoneID != null ? this.groupInfo.zoneTitle : this.groupInfo.plantTitle) + ' - ' + (this.RegionID != null ? this.subRows[0][this.config.config.reports.trucks.columns.orderIntake.region[this.config.config.language]] : this.subRows[0][this.config.config.reports.trucks.columns.orderIntake.product[this.config.config.language]]))
    this.groupInfo['thisActual'] = this.data.sumByIndex(this.subRows, this.config.config.reports.trucks.columns.orderIntake.actual)
    this.groupInfo['thisPrevious'] = this.data.sumByIndex(this.subRows, this.config.config.reports.trucks.columns.orderIntake.previous)
    this.groupInfo['progress1'] = this.percent(this.groupInfo.thisActual, this.data.sumByIndex(rows, this.config.config.reports.trucks.columns.orderIntake.actual))
    this.groupInfo['progress2'] = this.percent(this.groupInfo.thisPrevious, this.data.sumByIndex(rows, this.config.config.reports.trucks.columns.orderIntake.previous))
    this.groupInfo['sub3rows'] = this.data.classifyByIndex(this.subRows, this.RegionID != null ? this.config.config.reports.trucks.columns.orderIntake.product[this.config.config.language] : this.config.config.reports.trucks.columns.orderIntake.region[this.config.config.language])
    this.groupKeys = Object.keys(this.groupInfo.sub3rows);
    this.groupInfo = { ...this.groupInfo };
    // Tell the DOM it's ready to rock ’n’ roll !
    setTimeout(() => this.ready = true);
  }

  groupKeys = [];

  subRows;

  percent(part: number, total: number): number {
    return parseInt(((part * 100) / total).toFixed(0), 10);
  }

  returnToMain(): void {
    this.router.navigate(['/'], { relativeTo: this.activatedRoute, replaceUrl: true });
  }

  return(): void {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute, replaceUrl: true });
  }

}
