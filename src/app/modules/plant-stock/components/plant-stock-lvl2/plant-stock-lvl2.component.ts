import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';
import { Title } from '@angular/platform-browser';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
import { ToolsService } from '@services/tools.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'plant-stock-lvl2',
  templateUrl: './plant-stock-lvl2.component.html',
  styleUrls: ['./plant-stock-lvl2.component.scss'],
  host: {
    '(swiperight)': 'data.go("allocation")',
    '(swipeleft)': 'data.go("order-intake")'
  }
})
export class PlantStockLvl2Component implements OnInit {

  ready: boolean = false

  plandate: string = ''
  plants

  plant: string
  werk: string

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
      // If no Plant Stock rows were found, get them
      if (this.data.plantStockData.length == 0) {
        this.api.getPlantStockData(this.config.config.reports[this.config.config.target][this.config.config.scenario].plantStock).subscribe(res => {
          this.plandate = this.tools.getPlanDate(res.data[0][config.config.reports.trucks.columns.plantStock.actualDate], moment, this.config, true)
          this.data.plantStockData = res.data
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

  goWerk(werk): void {
    this.router.navigate(['plant-stock', this.plant, 'werk', werk], { replaceUrl: true })
  }

  changePlant(plant) {
    this.router.navigate(['plant-stock', plant, 'werk', this.werk], { replaceUrl: true })
  }

  goHofbestand(hofbestandKey) {
    this.router.navigate(['plant-stock', this.plant, 'werk', this.werk, 'hofbestand', hofbestandKey], { replaceUrl: true })
  }

  rollupData() {
    // Aliases
    const plantKey = this.config.config.reports.trucks.columns.plantStock.plantKey
    const plantName = this.config.config.reports.trucks.columns.plantStock.plantName
    const werkbestandName = this.config.config.reports.trucks.columns.plantStock.werkbestandName
    const hofbestandName = this.config.config.reports.trucks.columns.plantStock.hofbestandName
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
    this.werkbestands = Object.assign({}, this.data.classifyByIndex(filteredRowsByPlant, werkbestandName[this.config.config.language]))
    const filteredRowsByWerk = filteredRowsByPlant.filter(item => item[werkbestandName[this.config.config.language]] == this.werk)
    this.werkActual = this.data.sumByIndex(filteredRowsByWerk, this.config.config.reports.trucks.columns.plantStock.actual)
    this.werkPrevious = this.data.sumByIndex(filteredRowsByWerk, this.config.config.reports.trucks.columns.plantStock.previous)
    this.werkDelta = this.data.sumByIndex(filteredRowsByWerk, this.config.config.reports.trucks.columns.plantStock.delta)
    this.hofbestands = Object.assign({}, this.data.classifyByIndex(filteredRowsByWerk, hofbestandName[this.config.config.language]))
    if (this.hofbestands.hasOwnProperty("not defined")) {
      this.router.navigate(['plant-stock', this.plant, 'werk', this.werk, 'hofbestand', 'not defined'], { replaceUrl: true })
      return
    }
    if (this.hofbestands.hasOwnProperty("nicht definiert")) {
      this.router.navigate(['plant-stock', this.plant, 'werk', this.werk, 'hofbestand', 'nicht definiert'], { replaceUrl: true })
      return
    }
    this.actualValue = this.tools.percent(this.werkActual, this.totalActual)
    this.previousValue = this.tools.percent(this.werkPrevious, this.totalPrevious)
    setTimeout(() => {
      this.ready = true
    })
  }

  returnToMain(): void {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute })
  }

  actualValue
  previousValue

  totalActual: number = 0
  totalPrevious: number = 0
  totalDelta: number = 0

  werkActual: number = 0
  werkPrevious: number = 0
  werkDelta: number = 0

  werkbestands
  hofbestands
}
