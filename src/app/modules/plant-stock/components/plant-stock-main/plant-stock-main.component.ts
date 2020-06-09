import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { DataService } from '@services/data.service';
import { Title } from '@angular/platform-browser';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
import { ToolsService } from '@services/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'plant-stock-main',
  templateUrl: './plant-stock-main.component.html',
  styleUrls: ['./plant-stock-main.component.scss'],
  animations: [
    trigger('list', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('100ms', animate('300ms ease-in', style({ opacity: 1 }))), { optional: true })
      ])
    ]),
  ],
  host: {
    '(swiperight)': 'data.go("allocation")',
    '(swipeleft)': 'data.go("order-intake")'
  }
})
export class PlantStockMainComponent implements OnInit {

  ready: boolean = false

  plandate: string = ''
  plants

  plant: string

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
    (window as any).router = router;
    (window as any).moment = moment
    moment.locale(this.config.config.language)
    this.loader.loading$.next(true)
    this.activatedRoute.paramMap.subscribe(params => {
      this.plant = params.get('plant')
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

  goWerk(werk) : void {
    this.router.navigate(['werk', werk], { relativeTo: this.activatedRoute, replaceUrl: true })
  }

  changePlant(plant) {
    localStorage.setItem('plant-stock-plant', plant)
    this.router.navigate(['plant-stock', plant], { replaceUrl: true })
  }

  rollupData() {
    // Aliases
    const plantKey = this.config.config.reports.trucks.columns.plantStock.plantKey
    const plantName = this.config.config.reports.trucks.columns.plantStock.plantName
    const werkbestandName = this.config.config.reports.trucks.columns.plantStock.werkbestandName
    //
    this.plants = this.data.plantStockData.reduce((r,a) => {
      r[a[plantKey]] = r[a[plantKey]] || ''
      r[a[plantKey]] = a[plantName[this.config.config.corpintra ? this.config.config.language : 'en']]
      return r
    }, {})
    if (this.plant == null || !this.plants[this.plant]) {
      this.router.navigate(['plant-stock', Object.keys(this.plants)[0]], { replaceUrl: true })
      return
    }
    const plantCache = localStorage.getItem('plant-stock-plant')
    if (plantCache && plantCache != this.plant) this.router.navigate(['plant-stock', plantCache], { replaceUrl: true })
    this.title.setTitle(this.config.config.appTitle + ' - Plant Stock - '+((this.data.plantStockData.filter(item => item[plantKey] == this.plant)[0][plantName[this.config.config.corpintra ? this.config.config.language : 'en']])))
    const filteredRowsByPlant = this.data.plantStockData.filter(aloc => aloc[plantKey] == this.plant)
    this.totalActual = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.plantStock.actual)
    this.totalPrevious = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.plantStock.previous)
    this.totalDelta = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.plantStock.delta)
    this.werkbestands = { ...this.data.classifyByIndex(filteredRowsByPlant, werkbestandName[this.config.config.corpintra ? this.config.config.language : 'en']) }
    setTimeout(() => {
      this.ready = true
    })
  }

  totalActual: number = 0
  totalPrevious: number = 0
  totalDelta: number = 0

  werkbestands

}
