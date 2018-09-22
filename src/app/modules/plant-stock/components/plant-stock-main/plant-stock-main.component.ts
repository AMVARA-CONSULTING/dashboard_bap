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
    '[style.opacity]': 'loader.show ? 0 : 1'
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
    (window as any).moment = moment
    moment.locale(this.config.config.language)
    this.loader.Show()
    this.activatedRoute.paramMap.subscribe(params => {
      this.plant = params.get('plant')
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
    this.router.navigate(['plant-stock', plant])
  }

  rollupData() {
    // Aliases
    const plantKey = this.config.config.reports.trucks.columns.plant_stock.plantKey
    const plantName = this.config.config.reports.trucks.columns.plant_stock.plantName
    const werkbestandName = this.config.config.reports.trucks.columns.plant_stock.werkbestandName
    //
    this.plants = this.data.plantStockData.reduce((r,a) => {
      r[a[plantKey]] = r[a[plantKey]] || ''
      r[a[plantKey]] = a[plantName[this.config.config.language]]
      return r
    }, {})
    if (this.plant == null || !this.plants[this.plant]) {
      this.router.navigate(['plant-stock', Object.keys(this.plants)[0]])
      return
    }
    this.title.setTitle(this.config.config.appTitle + ' - Plant Stock - '+((this.data.plantStockData.filter(item => item[plantKey] == this.plant)[0][plantName[this.config.config.language]])))
    const filteredRowsByPlant = this.data.plantStockData.filter(aloc => aloc[plantKey] == this.plant)
    this.werkbestands = Object.assign({},this.data.classifyByIndex(filteredRowsByPlant, werkbestandName[this.config.config.language]))
    setTimeout(() => {
      this.ready = true
    })
  }

  werkbestands

}
