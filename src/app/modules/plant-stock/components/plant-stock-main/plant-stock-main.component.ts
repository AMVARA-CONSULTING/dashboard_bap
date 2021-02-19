import { Component } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { DataService } from '@services/data.service';
import { Title } from '@angular/platform-browser';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ReportTypes } from '@other/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { getPlanDateWithMoment } from '@other/functions';

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
    '(swiperight)': 'data.goFrom("plant_stock", $event)',
    '(swipeleft)': 'data.goFrom("plant_stock", $event)'
  }
})
export class PlantStockMainComponent {

  ready: boolean = false

  plandate: string = ''
  plants

  plant: string

  // Names of the routes for each level
  main_route: string = 'companies'
  second_level_route: string = 'cities'

  constructor(
    public data: DataService,
    private title: Title,
    private api: ApiService,
    public config: ConfigService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    (window as any).router = router;
    (window as any).moment = moment
    moment.locale(this.config.config.language)
    this.activatedRoute.paramMap.subscribe(params => {
      this.plant = params.get('plant')
      // If no Plant Stock rows were found, get them
      if (this.data.plantStockData.length == 0) {
        this.api.getSavedReportData(ReportTypes.PlantStock).subscribe(res => {
          this.plandate = getPlanDateWithMoment(res[0][config.config.reports.trucks.columns.plantStock.actualDate], moment, true)
          this.data.plantStockData = res
          this.rollupData()
        })
      } else {
        this.plandate = getPlanDateWithMoment(this.data.plantStockData[0][config.config.reports.trucks.columns.plantStock.actualDate], moment, true)
        this.rollupData()
      }
    })
  }

  goWerk(werk) : void {
    this.router.navigate([this.second_level_route, werk], { relativeTo: this.activatedRoute, replaceUrl: true })
  }

  changePlant(plant) {
    localStorage.setItem('plant-stock-plant', plant)
    this.router.navigate([this.main_route, plant], { replaceUrl: true })
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
      this.router.navigate([this.main_route, Object.keys(this.plants)[0]], { replaceUrl: true })
      return
    }
    const plantCache = localStorage.getItem('plant-stock-plant')
    if (plantCache && plantCache != this.plant) this.router.navigate([this.main_route, plantCache], { replaceUrl: true })
    this.title.setTitle(this.config.config.appTitle + ' - ' + this.translate.instant('menu.plant_stock') + ' - '+((this.data.plantStockData.filter(item => item[plantKey] == this.plant)[0][plantName[this.config.config.corpintra ? this.config.config.language : 'en']])))
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
