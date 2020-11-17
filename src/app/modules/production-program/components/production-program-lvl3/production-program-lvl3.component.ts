import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment'
import { ToolsService } from '@services/tools.service';
import { ReportTypes } from '@other/interfaces';

@Component({
  selector: 'production-program-lvl3',
  templateUrl: './production-program-lvl3.component.html',
  styleUrls: ['./production-program-lvl3.component.scss'],
  host: {
    '(swiperight)': 'data.go("order-intake")',
    '(swipeleft)': 'data.go("allocation")'
  }
})
export class ProductionProgramLvl3Component {

  ZoneID: any = null
  PlantID: any = null

  RegionID: any = null
  ProductID: any = null

  plandate: string = ''

  ready: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private loader: LoadingService,
    public data: DataService,
    private api: ApiService,
    private config: ConfigService,
    private router: Router,
    private title: Title,
    private tools: ToolsService
  ) {
    (window as any).pp3 = this;
    title.setTitle(this.config.config.appTitle + ' - Production Program')
    // Show the loader while getting/loading the data
    this.loader.loading$.next(true)
    this.activatedRoute.paramMap.subscribe(params => {
      this.year = params.get('year')
      this.type = params.get('type')
      this.type2 = params.get('type2')
      this.region_id = decodeURI(params.get('region_id'))
      this.id = params.get('id')
      if (this.type == 'zone') {
        this.ZoneID = this.id
      } else {
        this.PlantID = this.id
      }
      if (this.type2 == 'region') {
        this.RegionID = decodeURI(this.region_id)
        this.ProductID = null
      } else {
        this.ProductID = decodeURI(this.region_id)
        this.RegionID = null
      }
      // If no Order Intake rows were found, get them
      if (this.data.productionProgramData.length == 0) {
        this.api.getSavedReportData(ReportTypes.ProductionProgram).subscribe(res => {
          this.plandate = this.tools.getPlanDate(res[0][14], moment, this.config);
          this.data.productionProgramData = res;
          this.productionProgramData = res.filter(dat => dat[13] == this.year);
          if (this.ZoneID != null) {
            if (this.RegionID != null) {
              const tmp = this.data.productionProgramData.filter(item => item[0] == this.ZoneID && item[this.config.config.language == 'en' ? 10 : 9] == this.RegionID)
              this.years = Object.keys(this.data.classifyByIndex(tmp, 13))
            } else {
              const tmp = this.data.productionProgramData.filter(item => item[0] == this.ZoneID && item[this.config.config.language == 'en' ? 12 : 11] == this.ProductID)
              this.years = Object.keys(this.data.classifyByIndex(tmp, 13))
            }
          } else {
            if (this.RegionID != null) {
              const tmp = this.data.productionProgramData.filter(item => item[3] == this.PlantID && item[this.config.config.language == 'en' ? 10 : 9] == this.RegionID)
              this.years = Object.keys(this.data.classifyByIndex(tmp, 13))
            } else {
              const tmp = this.data.productionProgramData.filter(item => item[3] == this.PlantID && item[this.config.config.language == 'en' ? 12 : 11] == this.ProductID)
              this.years = Object.keys(this.data.classifyByIndex(tmp, 13))
            }
          }
          try {
            this.rollupData()
          } catch (err) {
            this.router.navigate(['production-program'], { replaceUrl: true })
          }
          this.loader.loading$.next(false)
        })
      } else {
        this.plandate = this.tools.getPlanDate(this.data.productionProgramData[0][14], moment, this.config)
        this.productionProgramData = this.data.productionProgramData.filter(dat => dat[13] == this.year)
        if (this.ZoneID != null) {
          if (this.RegionID != null) {
            const tmp = this.data.productionProgramData.filter(item => item[0] == this.ZoneID && item[this.config.config.language == 'en' ? 10 : 9] == this.RegionID)
            this.years = Object.keys(this.data.classifyByIndex(tmp, 13))
          } else {
            const tmp = this.data.productionProgramData.filter(item => item[0] == this.ZoneID && item[this.config.config.language == 'en' ? 12 : 11] == this.ProductID)
            this.years = Object.keys(this.data.classifyByIndex(tmp, 13))
          }
        } else {
          if (this.RegionID != null) {
            const tmp = this.data.productionProgramData.filter(item => item[3] == this.PlantID && item[this.config.config.language == 'en' ? 10 : 9] == this.RegionID)
            this.years = Object.keys(this.data.classifyByIndex(tmp, 13))
          } else {
            const tmp = this.data.productionProgramData.filter(item => item[3] == this.PlantID && item[this.config.config.language == 'en' ? 12 : 11] == this.ProductID)
            this.years = Object.keys(this.data.classifyByIndex(tmp, 13))
          }
        }
        // Transform numeric values to real numeric values, also checking NaN or null
        // DEPRECATED
        /* this.productionProgramData.forEach((row, index, rows) => {
          this.config.config.reports.trucks.columns.productionProgram.shouldBeNumber.forEach(i => {
            rows[index][i] = isNaN(rows[index][i]) ? 0 : parseFloat(rows[index][i])
          });
        }) */
        try {
          this.rollupData()
        } catch (err) {
          this.router.navigate(['production-program'], { replaceUrl: true })
        }
        this.loader.loading$.next(false)
      }
    })
  }

  goForProduct(key): void {
    this.router.navigate(['../../', 'product', key], { relativeTo: this.activatedRoute, replaceUrl: true })
  }

  goForRegion(key): void {
    this.router.navigate(['../../', 'region', key], { relativeTo: this.activatedRoute, replaceUrl: true })
  }

  productionProgramData: any[][] = []

  year: string = ''
  type: string = ''
  id: string = ''
  type2: string = ''
  region_id: string = ''
  years: string[] = []

  groupInfo: any

  changeYear(year: string, years?: string[]): void {
    localStorage.setItem('production-year', year)
    this.loader.loading$.next(true)
    this.router.navigate(['production-program', year, this.type, this.id, this.type2, this.region_id], { replaceUrl: true })
  }

  rollupData(): void {
    let rows
    // Reduce rows depending on route, by Plant or by Zone
    if (this.ZoneID != null) {
      rows = this.data.classifyByIndex(this.productionProgramData, 0)[this.ZoneID]
    } else {
      rows = this.data.classifyByIndex(this.productionProgramData, 3)[this.PlantID]
    }
    // Gettings rows only for the zone selected
    let zoneRows = this.productionProgramData.reduce((r, a) => {
      r[a[0]] = r[a[0]] || []
      r[a[0]].push(a)
      return r
    }, {})[rows[0][0]]
    // Getting rows only for the plant selected
    // If type is plant group by plant sub id
    let reducedIndexForZoneLevel = 3
    let reducedSelector = rows[0][3]
    if (this.type == 'zone') {
      reducedIndexForZoneLevel = this.config.config.language == 'en' ? 10 : 9
      reducedSelector = this.region_id
    }
    let plantRows = rows.reduce((r, a) => {
      r[a[reducedIndexForZoneLevel]] = r[a[reducedIndexForZoneLevel]] || []
      r[a[reducedIndexForZoneLevel]].push(a)
      return r
    }, {})[reducedSelector]
    // Collect data info for data headers
    this.groupInfo = {
      zone: this.ZoneID != null,
      zoneRows: zoneRows,
      plantRows: plantRows,
      rowsPlain: rows,
      zoneID: rows[0][0],
      plantID: rows[0][3],
      totalCustomer: this.data.sumByIndex(this.productionProgramData, 15),
      totalPlan: this.data.sumByIndex(this.productionProgramData, 16),
      totalTotal: this.data.sumByIndex(this.productionProgramData, 17),
      totalTotalDiff: this.data.sumByIndex(this.productionProgramData, 21),
      totalReserve: this.data.sumByIndex(this.productionProgramData, 22),
      zoneTitle: rows[0][this.config.config.language == 'en' ? 1 : 2],
      plantTitle: rows[0][this.config.config.language == 'en' ? 7 : 6],
      zoneCustomer: this.data.sumByIndex(zoneRows, 15),
      zonePlan: this.data.sumByIndex(zoneRows, 16),
      zoneTotal: this.data.sumByIndex(zoneRows, 17),
      zoneTotalDiff: this.data.sumByIndex(zoneRows, 21),
      zoneReserve: this.data.sumByIndex(zoneRows, 22),
      plantCustomer: this.data.sumByIndex(plantRows, 15),
      plantPlan: this.data.sumByIndex(plantRows, 16),
      plantTotal: this.data.sumByIndex(plantRows, 17),
      plantTotalDiff: this.data.sumByIndex(plantRows, 21),
      plantReserve: this.data.sumByIndex(plantRows, 22),
      productsPlain: plantRows.filter(item => item[this.config.config.language == 'en' ? 10 : 9] == this.region_id),
      regionsPlain: plantRows.filter(item => item[this.config.config.language == 'en' ? 12 : 11] == this.region_id)
    }
    if (this.RegionID != null && this.groupInfo.productsPlain.length == 0) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute, replaceUrl: true })
    }
    if (this.ProductID != null && this.groupInfo.regionsPlain.length == 0) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute, replaceUrl: true })
    }
    if (this.RegionID != null) {
      this.groupInfo.products = this.data.classifyByIndex(this.groupInfo.productsPlain, this.config.config.language == 'en' ? 12 : 11)
      this.groupInfo.productKeys = Object.keys(this.groupInfo.products).sort()
    } else {
      this.groupInfo.regions = this.data.classifyByIndex(this.groupInfo.regionsPlain, this.config.config.language == 'en' ? 10 : 9)
      this.groupInfo.regionKeys = Object.keys(this.groupInfo.regions).sort()
    }
    this.title.setTitle(this.config.config.appTitle + ' - Production Program - ' + (this.ZoneID != null ? this.groupInfo.zoneTitle : this.groupInfo.plantTitle) + ' - ' +
      (this.RegionID != null ? this.RegionID : this.ProductID))
    this.groupInfo.progress1Value = this.RegionID != null ? this.data.sumByIndex(this.groupInfo.productsPlain, 15) : this.data.sumByIndex(this.groupInfo.regionsPlain, 15)
    this.groupInfo.progress2Value = this.RegionID != null ? this.data.sumByIndex(this.groupInfo.productsPlain, 16) : this.data.sumByIndex(this.groupInfo.regionsPlain, 16)
    this.groupInfo.progress3Value = this.RegionID != null ? this.data.sumByIndex(this.groupInfo.productsPlain, 17) : this.data.sumByIndex(this.groupInfo.regionsPlain, 17)
    this.groupInfo.progress4Value = this.RegionID != null ? this.data.sumByIndex(this.groupInfo.productsPlain, 22) : this.data.sumByIndex(this.groupInfo.regionsPlain, 22)
    this.groupInfo.progress1 = this.RegionID != null ?
      this.percent(this.data.sumByIndex(this.groupInfo.productsPlain, 15), this.type == 'plant' ? this.data.sumByIndex(plantRows, 15): this.groupInfo.zoneCustomer) :
      this.percent(this.data.sumByIndex(this.groupInfo.regionsPlain, 15), this.type == 'plant' ? this.data.sumByIndex(plantRows, 15): this.groupInfo.zoneCustomer)
    this.groupInfo.progress2 = this.RegionID != null ?
      this.percent(this.data.sumByIndex(this.groupInfo.productsPlain, 16), this.type == 'plant' ? this.data.sumByIndex(plantRows, 16): this.groupInfo.zonePlan) :
      this.percent(this.data.sumByIndex(this.groupInfo.regionsPlain, 16), this.type == 'plant' ? this.data.sumByIndex(plantRows, 16): this.groupInfo.zonePlan)
    this.groupInfo.progress3 = this.RegionID != null ?
      this.percent(this.data.sumByIndex(this.groupInfo.productsPlain, 17), this.type == 'plant' ? this.data.sumByIndex(plantRows, 17): this.groupInfo.zoneTotal) :
      this.percent(this.data.sumByIndex(this.groupInfo.regionsPlain, 17), this.type == 'plant' ? this.data.sumByIndex(plantRows, 17): this.groupInfo.zoneTotal)
    this.groupInfo.progress4 = this.RegionID != null ?
      this.percent(this.data.sumByIndex(this.groupInfo.productsPlain, 22), this.type == 'plant' ? this.data.sumByIndex(plantRows, 22): this.groupInfo.zoneReserve) :
      this.percent(this.data.sumByIndex(this.groupInfo.regionsPlain, 22), this.type == 'plant' ? this.data.sumByIndex(plantRows, 22): this.groupInfo.zoneReserve)
    this.groupInfo = { ...this.groupInfo }
    // Tell the DOM it's ready to rock ’n’ roll !
    setTimeout(() => this.ready = true)
  }

  percent(part: number, total: number): number {
    return parseInt(((part * 100) / total).toFixed(0))
  }

  return(): void {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute, replaceUrl: true })
  }

  returnToMain(): void {
    this.router.navigate(['../../../../'], { relativeTo: this.activatedRoute, replaceUrl: true })
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
    this.router.navigate(['region', encodeURI(ProductID)], { relativeTo: this.activatedRoute, replaceUrl: true })
  }

  goRegion(RegionID): void {
    this.data.lastTap = {
      type: 'product',
      key: encodeURI(RegionID)
    }
    this.router.navigate(['product', encodeURI(RegionID)], { relativeTo: this.activatedRoute, replaceUrl: true })
  }

}
