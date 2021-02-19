import { Component } from '@angular/core';
import { DataService } from '@services/data.service';
import { Title } from '@angular/platform-browser';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ReportTypes } from '@other/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { getPlanDateWithMoment, percent } from '@other/functions';

@Component({
  selector: 'plant-stock-lvl3',
  templateUrl: './plant-stock-lvl3.component.html',
  styleUrls: ['./plant-stock-lvl3.component.scss'],
  host: {
    '(swiperight)': 'data.goFrom("plant_stock", $event)',
    '(swipeleft)': 'data.goFrom("plant_stock", $event)'
  }
})
export class PlantStockLvl3Component {

  ready: boolean = false

  plandate: string = ''
  plants

  plant: string
  werk: string
  hofb: string

  // Names of the routes for each level
  main_route: string = 'companies'
  second_level_route: string = 'cities'
  third_level_route: string = 'city'

  constructor(
    public data: DataService,
    private title: Title,
    private api: ApiService,
    public config: ConfigService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    (window as any).moment = moment
    moment.locale(this.config.config.language)
    this.activatedRoute.paramMap.subscribe(params => {
      this.plant = params.get('plant')
      this.werk = params.get('werk')
      this.hofb = params.get('hofb')
      // If no Plant Stock rows were found, get them
      if (this.data.plantStockData.length == 0) {
        this.api.getSavedReportData(ReportTypes.PlantStock).subscribe(res => {
          this.plandate = getPlanDateWithMoment(res[0][config.config.reports.trucks.columns.plantStock.actualDate], moment, true)
          this.data.plantStockData = res
          // Transform numeric values to real numeric values, also checking NaN or null
          // DEPRECATED
          /* this.data.plantStockData.forEach((row, index, rows) => {
            config.config.reports.trucks.columns.plantStock.shouldBeNumber.forEach(num => {
              rows[index][num] = isNaN(rows[index][num]) ? 0 : parseFloat(rows[index][num])
            });
          }) */
          this.rollupData()
        })
      } else {
        this.plandate = getPlanDateWithMoment(this.data.plantStockData[0][config.config.reports.trucks.columns.plantStock.actualDate], moment, true)
        this.rollupData()
      }
    })
  }

  changePlant(plant) {
    this.router.navigate([this.main_route, plant, this.second_level_route, this.werk, this.third_level_route, this.hofb], { replaceUrl: true })
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
      r[a[plantKey]] = a[plantName[this.config.config.corpintra ? this.config.config.language : 'en']]
      return r
    }, {})
    if (this.plant == null || !this.plants[this.plant]) {
      this.router.navigate([this.main_route, Object.keys(this.plants)[0]], { replaceUrl: true })
      return
    }
    this.title.setTitle(this.config.config.appTitle + ' - ' + this.translate.instant('menu.plant_stock') + ' - ' + ((this.data.plantStockData.filter(item => item[plantKey] == this.plant)[0][plantName[this.config.config.corpintra ? this.config.config.language : 'en']])))
    const filteredRowsByPlant = this.data.plantStockData.filter(aloc => aloc[plantKey] == this.plant)
    this.totalActual = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.plantStock.actual)
    this.totalPrevious = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.plantStock.previous)
    this.totalDelta = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.plantStock.delta)
    this.werkbestands = { ...this.data.classifyByIndex(filteredRowsByPlant, werkbestandName[this.config.config.corpintra ? this.config.config.language : 'en']) }
    const filteredRowsByWerk = filteredRowsByPlant.filter(item => item[werkbestandName[this.config.config.corpintra ? this.config.config.language : 'en']] == this.werk)
    this.werkActual = this.data.sumByIndex(filteredRowsByWerk, this.config.config.reports.trucks.columns.plantStock.actual)
    this.werkPrevious = this.data.sumByIndex(filteredRowsByWerk, this.config.config.reports.trucks.columns.plantStock.previous)
    this.werkDelta = this.data.sumByIndex(filteredRowsByWerk, this.config.config.reports.trucks.columns.plantStock.delta)
    this.hofbestands = { ...this.data.classifyByIndex(filteredRowsByWerk, hofbestandName[this.config.config.corpintra ? this.config.config.language : 'en']) }
    const filteredRowsByHofbestand = filteredRowsByWerk.filter(item => item[hofbestandName[this.config.config.corpintra ? this.config.config.language : 'en']] == this.hofb)
    this.hofbActual = this.data.sumByIndex(filteredRowsByHofbestand, this.config.config.reports.trucks.columns.plantStock.actual)
    this.hofbPrevious = this.data.sumByIndex(filteredRowsByHofbestand, this.config.config.reports.trucks.columns.plantStock.previous)
    this.hofbDelta = this.data.sumByIndex(filteredRowsByHofbestand, this.config.config.reports.trucks.columns.plantStock.delta)
    this.regions = { ...this.data.classifyByIndex(filteredRowsByHofbestand, regionName[this.config.config.corpintra ? this.config.config.language : 'en']) }
    this.products = { ...this.data.classifyByIndex(filteredRowsByHofbestand, productName[this.config.config.corpintra ? this.config.config.language : 'en']) }
    this.actualValue = +percent(this.hofbActual, this.werkActual)
    this.previousValue = +percent(this.hofbPrevious, this.werkPrevious)
    setTimeout(() => {
      this.ready = true
    })
  }

  goWerk(werk): void {
    this.router.navigate([this.main_route, this.plant, this.second_level_route, werk], { replaceUrl: true })
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
