import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'production-program-lvl2',
  templateUrl: './production-program-lvl2.component.html',
  styleUrls: ['./production-program-lvl2.component.scss'],
})
export class ProductionProgramLvl2Component implements OnInit {

  ZoneID: any = null
  PlantID: any = null

  ready: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private loader: LoadingService,
    public data: DataService,
    private api: ApiService,
    private config: ConfigService,
    private router: Router,
    private title: Title
  ) {
    title.setTitle('DIP - Production Program')
    // Show the loader while getting/loading the data
    this.loader.Show()
    this.activatedRoute.paramMap.subscribe(params => {
      this.year = params.get('year')
      if (params.get('type') == 'zone') {
        this.ZoneID = params.get('id')
      } else {
        this.PlantID = params.get('id')
      }
      console.log({ 
        year: params.get('year'),
        type: params.get('type'),
        zone: params.get('id'),
      })
      // If no Order Intake rows were found, get them
      if (this.data.productionProgramData.length == 0) {
        this.api.getProductionProgramData().subscribe(data => {
          this.data.productionProgramData = data.filter(dat => dat[13] == this.year)
          // Transform numeric values to real numeric values, also checking NaN or null
          this.data.productionProgramData.forEach((row, index, rows) => {
            rows[index][15] = isNaN(rows[index][15]) ? 0 : parseFloat(rows[index][15])
            rows[index][16] = isNaN(rows[index][16]) ? 0 : parseFloat(rows[index][16])
            rows[index][17] = isNaN(rows[index][17]) ? 0 : parseFloat(rows[index][17])
            rows[index][18] = isNaN(rows[index][18]) ? 0 : parseFloat(rows[index][18])
            rows[index][19] = isNaN(rows[index][19]) ? 0 : parseFloat(rows[index][19])
            rows[index][20] = isNaN(rows[index][20]) ? 0 : parseFloat(rows[index][20])
            rows[index][21] = isNaN(rows[index][21]) ? 0 : parseFloat(rows[index][21])
            rows[index][22] = isNaN(rows[index][22]) ? 0 : parseFloat(rows[index][22])
            rows[index][23] = isNaN(rows[index][23]) ? 0 : parseFloat(rows[index][23])
            rows[index][24] = isNaN(rows[index][24]) ? 0 : parseFloat(rows[index][24])
          })
          this.rollupData()
          this.loader.Hide()
        })
      } else {
        this.rollupData()
        this.loader.Hide()
      }
    })
  }

  year: string = ''
  years: string[] = []

  groupInfo: any

  rollupData(): void {
    let rows
    // Reduce rows depending on route, by Plant or by Zone
    if (this.ZoneID != null) {
      rows = this.data.classifyByIndex(this.data.orderIntakeData, 0)[this.ZoneID]
    } else {
      rows = this.data.classifyByIndex(this.data.orderIntakeData, 3)[this.PlantID]
    }
    // Gettings rows only for the zone selected
    let zoneRows = this.data.orderIntakeData.reduce((r, a) => {
        r[a[0]] = r[a[0]] || []
        r[a[0]].push(a)
        return r
    }, {})[rows[0][0]]
    // Getting rows only for the plant selected
    let plantRows = this.data.orderIntakeData.reduce((r, a) => {
      r[a[3]] = r[a[3]] || []
      r[a[3]].push(a)
      return r
    }, {})[rows[0][3]]
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
    this.title.setTitle('DIP - Order Intake - '+(this.ZoneID != null ? this.groupInfo.zoneTitle : this.groupInfo.plantTitle))
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

  percent(part: number, total: number) : number {
    return parseInt(((part * 100) / total).toFixed(0))
  }

  ngOnInit() {
  }

  return() : void {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute })
  }

  forward(): void {
    if (this.data.lastTap2) {
      if (this.data.lastTap2.type == 'region') {
        this.router.navigate(['region', this.data.lastTap2.key], { relativeTo: this.activatedRoute })
      } else {
        this.router.navigate(['product', this.data.lastTap2.key], { relativeTo: this.activatedRoute })
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
