import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';
import { Title } from '@angular/platform-browser';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
import { ToolsService } from '@services/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'plant-stock-lvl3',
  templateUrl: './plant-stock-lvl3.component.html',
  styleUrls: ['./plant-stock-lvl3.component.scss'],
  host: {
    '(swiperight)': 'data.go("allocation")',
    '(swipeleft)': 'data.go("order-intake")'
  }
})
export class PlantStockLvl3Component implements OnInit {

  ready: boolean = false

  plandate: string = ''
  plants

  plant: string
  werk: string
  hofb: string

  constructor(
    public loader: LoadingService,
    public data: DataService,
    private title: Title,
    private api: ApiService,
    public config: ConfigService,
    private tools: ToolsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    (window as any).moment = moment
    moment.locale(this.config.config.language)
    this.loader.loading$.next(true)
    this.activatedRoute.paramMap.subscribe(params => {
      this.plant = params.get('plant')
      this.werk = params.get('werk')
      this.hofb = params.get('hofb')
      // If no Plant Stock rows were found, get them
      if (this.data.plantStockData.length == 0) {
        this.api.getPlantStockData(this.config.config.reports[this.config.config.target][this.config.config.scenario].plantStock).subscribe(res => {
          this.plandate = this.tools.getPlanDate(res.data[0][config.config.reports.trucks.columns.plantStock.actualDate], moment, this.config, true)
          this.data.plantStockData = res.data
          // Transform numeric values to real numeric values, also checking NaN or null
          // DEPRECATED
          /* this.data.plantStockData.forEach((row, index, rows) => {
            config.config.reports.trucks.columns.plantStock.shouldBeNumber.forEach(num => {
              rows[index][num] = isNaN(rows[index][num]) ? 0 : parseFloat(rows[index][num])
            });
          }) */
          this.rollupData()
          this.loader.loading$.next(false)
        })
      } else {
        this.plandate = this.tools.getPlanDate(this.data.plantStockData[0][config.config.reports.trucks.columns.plantStock.actualDate], moment, this.config, true)
        this.rollupData()
        this.loader.loading$.next(false)
      }
    })
  }

  ngOnInit() {
  }

  changePlant(plant) {
    this.router.navigate(['plant-stock', plant, 'werk', this.werk, 'hofbestand', this.hofb], { replaceUrl: true })
  }

  rollupData() {
    // Aliases
    const plantKey = this.config.config.reports.trucks.columns.plantStock.plantKey
    const plantName = this.config.config.reports.trucks.columns.plantStock.plantName
    const werkbestandName = this.config.config.reports.trucks.columns.plantStock.werkbestandName
    const hofbestandName = this.config.config.reports.trucks.columns.plantStock.hofbestandName
    const regionName = this.config.config.reports.trucks.columns.plantStock.regionName
    const productName = this.config.config.reports.trucks.columns.plantStock.productName
    //
    this.plants = this.data.plantStockData.reduce((r, a) => {
      r[a[plantKey]] = r[a[plantKey]] || ''
      r[a[plantKey]] = a[plantName[this.config.config.language]]
      return r
    }, {})
    if (this.plant == null || !this.plants[this.plant]) {
      this.router.navigate(['plant-stock', Object.keys(this.plants)[0]], { replaceUrl: true })
      return
    }
    this.title.setTitle(this.config.config.appTitle + ' - Plant Stock - ' + ((this.data.plantStockData.filter(item => item[plantKey] == this.plant)[0][plantName[this.config.config.language]])))
    const filteredRowsByPlant = this.data.plantStockData.filter(aloc => aloc[plantKey] == this.plant)
    this.totalActual = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.plantStock.actual)
    this.totalPrevious = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.plantStock.previous)
    this.totalDelta = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.plantStock.delta)
    this.werkbestands = { ...this.data.classifyByIndex(filteredRowsByPlant, werkbestandName[this.config.config.language]) }
    const filteredRowsByWerk = filteredRowsByPlant.filter(item => item[werkbestandName[this.config.config.language]] == this.werk)
    this.werkActual = this.data.sumByIndex(filteredRowsByWerk, this.config.config.reports.trucks.columns.plantStock.actual)
    this.werkPrevious = this.data.sumByIndex(filteredRowsByWerk, this.config.config.reports.trucks.columns.plantStock.previous)
    this.werkDelta = this.data.sumByIndex(filteredRowsByWerk, this.config.config.reports.trucks.columns.plantStock.delta)
    this.hofbestands = { ...this.data.classifyByIndex(filteredRowsByWerk, hofbestandName[this.config.config.language]) }
    const filteredRowsByHofbestand = filteredRowsByWerk.filter(item => item[hofbestandName[this.config.config.language]] == this.hofb)
    this.hofbActual = this.data.sumByIndex(filteredRowsByHofbestand, this.config.config.reports.trucks.columns.plantStock.actual)
    this.hofbPrevious = this.data.sumByIndex(filteredRowsByHofbestand, this.config.config.reports.trucks.columns.plantStock.previous)
    this.hofbDelta = this.data.sumByIndex(filteredRowsByHofbestand, this.config.config.reports.trucks.columns.plantStock.delta)
    this.regions = { ...this.data.classifyByIndex(filteredRowsByHofbestand, regionName[this.config.config.language]) }
    this.products = { ...this.data.classifyByIndex(filteredRowsByHofbestand, productName[this.config.config.language]) }
    this.actualValue = +this.tools.percent(this.hofbActual, this.werkActual)
    this.previousValue = +this.tools.percent(this.hofbPrevious, this.werkPrevious)
    setTimeout(() => {
      this.ready = true
    })
  }

  goWerk(werk): void {
    this.router.navigate(['plant-stock', this.plant, 'werk', werk], { replaceUrl: true })
  }

  returnToMain(): void {
    this.router.navigate(['../../../../'], { relativeTo: this.activatedRoute })
  }

  returnToLvl2(): void {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute })
  }

  actualValue: number = 0
  previousValue: number = 0

  totalActual: number = 0
  totalPrevious: number = 0
  totalDelta: number = 0

  werkActual: number = 0
  werkPrevious: number = 0
  werkDelta: number = 0

  hofbActual: number = 0
  hofbPrevious: number = 0
  hofbDelta: number = 0

  werkbestands
  hofbestands

  regions
  products

}
