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
    '(swiperight)': 'returnToLvl2()'
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
    this.loader.Show()
    this.activatedRoute.paramMap.subscribe(params => {
      this.plant = params.get('plant')
      this.werk = params.get('werk')
      this.hofb = params.get('hofb')
      // If no Plant Stock rows were found, get them
      if (this.data.plantStockData.length == 0) {
        this.api.getPlantStockData().subscribe(data => {
          this.plandate = moment(data[0][config.config.reports.trucks.columns.plant_stock.actualDate], 'MM/DD/YYYY').format(this.config.config.language == 'en' ? 'DD/MM/YYYY' : 'DD.MM.YYYY')
          this.data.plantStockData = data
          // Transform numeric values to real numeric values, also checking NaN or null
          this.data.plantStockData.forEach((row, index, rows) => {
            config.config.reports.trucks.columns.plant_stock.shouldBeNumber.forEach(num => {
              rows[index][num] = isNaN(rows[index][num]) ? 0 : parseFloat(rows[index][num])
            });
          })
          this.rollupData()
          this.loader.Hide()
        })
      } else {
        this.plandate = moment(this.data.plantStockData[0][config.config.reports.trucks.columns.plant_stock.actualDate], 'MM/DD/YYYY').format(this.config.config.language == 'en' ? 'DD/MM/YYYY' : 'DD.MM.YYYY')
        this.rollupData()
        this.loader.Hide()
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
    const plantKey = this.config.config.reports.trucks.columns.plant_stock.plantKey
    const plantName = this.config.config.reports.trucks.columns.plant_stock.plantName
    const werkbestandName = this.config.config.reports.trucks.columns.plant_stock.werkbestandName
    const hofbestandName = this.config.config.reports.trucks.columns.plant_stock.hofbestandName
    const regionName = this.config.config.reports.trucks.columns.plant_stock.regionName
    const productName = this.config.config.reports.trucks.columns.plant_stock.productName
    //
    this.plants = this.data.plantStockData.reduce((r,a) => {
      r[a[plantKey]] = r[a[plantKey]] || ''
      r[a[plantKey]] = a[plantName[this.config.config.language]]
      return r
    }, {})
    if (this.plant == null || !this.plants[this.plant]) {
      this.router.navigate(['plant-stock', Object.keys(this.plants)[0]], { replaceUrl: true })
      return
    }
    this.title.setTitle(this.config.config.appTitle + ' - Plant Stock - '+((this.data.plantStockData.filter(item => item[plantKey] == this.plant)[0][plantName[this.config.config.language]])))
    const filteredRowsByPlant = this.data.plantStockData.filter(aloc => aloc[plantKey] == this.plant)
    this.totalActual = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.plant_stock.actual)
    this.totalPrevious = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.plant_stock.previous)
    this.totalDelta = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.plant_stock.delta)
    this.werkbestands = Object.assign({}, this.data.classifyByIndex(filteredRowsByPlant, werkbestandName[this.config.config.language]))
    const filteredRowsByWerk = filteredRowsByPlant.filter(item => item[werkbestandName[this.config.config.language]] == this.werk)
    this.werkActual = this.data.sumByIndex(filteredRowsByWerk, this.config.config.reports.trucks.columns.plant_stock.actual)
    this.werkPrevious = this.data.sumByIndex(filteredRowsByWerk, this.config.config.reports.trucks.columns.plant_stock.previous)
    this.werkDelta = this.data.sumByIndex(filteredRowsByWerk, this.config.config.reports.trucks.columns.plant_stock.delta)
    this.hofbestands = Object.assign({}, this.data.classifyByIndex(filteredRowsByWerk, hofbestandName[this.config.config.language]))
    const filteredRowsByHofbestand = filteredRowsByWerk.filter(item => item[hofbestandName[this.config.config.language]] == this.hofb)
    this.hofbActual = this.data.sumByIndex(filteredRowsByHofbestand, this.config.config.reports.trucks.columns.plant_stock.actual)
    this.hofbPrevious = this.data.sumByIndex(filteredRowsByHofbestand, this.config.config.reports.trucks.columns.plant_stock.previous)
    this.hofbDelta = this.data.sumByIndex(filteredRowsByHofbestand, this.config.config.reports.trucks.columns.plant_stock.delta)
    this.regions = Object.assign({}, this.data.classifyByIndex(filteredRowsByHofbestand, regionName[this.config.config.language]))
    this.products = Object.assign({}, this.data.classifyByIndex(filteredRowsByHofbestand, productName[this.config.config.language]))
    setTimeout(() => {
      this.ready = true
    })
  }

  returnToMain(): void {
    this.router.navigate(['../../../../'], { relativeTo: this.activatedRoute })
  }

  returnToLvl2(): void {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute })
  }

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
