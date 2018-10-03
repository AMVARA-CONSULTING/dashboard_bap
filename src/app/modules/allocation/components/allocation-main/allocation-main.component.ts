import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { LoadingService } from '@services/loading.service';
import { Title } from '@angular/platform-browser';
import { ApiService } from '@services/api.service';
import * as moment from 'moment';
import { ConfigService } from '@services/config.service';
import { ToolsService } from '@services/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, query, style, stagger, animate, state } from '@angular/animations';

@Component({
  selector: 'allocation-main',
  templateUrl: './allocation-main.component.html',
  styleUrls: ['./allocation-main.component.scss'],
  animations: [
    trigger('list', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('100ms', animate('300ms ease-in', style({ opacity: 1 }))), { optional: true })
      ])
    ]),
    trigger('fade', [
      state('false', style({ opacity: 0, height: 0, overflow: 'hidden' })),
      state('true', style({ opacity: 1, height: '35px', overflow: 'initial' })),
      transition('false => true', animate('250ms', style({ opacity: 1, height: '35px', overflow: 'initial' })))
    ])
  ],
  host: {
    '[style.opacity]': 'loader.show ? 0 : 1',
    '(swiperight)': 'data.go("production-program")',
    '(swipeleft)': 'data.go("plant-stock")'
  }
})
export class AllocationMainComponent implements OnInit {

  ready: boolean = false

  plandate: string = ''
  plants

  years: string[] = []

  months = []

  plant: string

  constructor(
    public data: DataService,
    private loader: LoadingService,
    private title: Title,
    private api: ApiService,
    public config: ConfigService,
    private tools: ToolsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    (window as any).moment = moment
    moment.locale(this.config.config.language)
    this.title.setTitle(this.config.config.appTitle + ' - Allocation')
    this.loader.Show()
    this.activatedRoute.paramMap.subscribe(params => {
      this.plant = params.get('plant')
      // If no Allocation rows were found, get them
      if (this.data.allocationData.length == 0) {
        this.api.getAllocationData().subscribe(data => {
          this.plandate = moment(data[0][18], 'MMM DD, YYYY').format(this.config.config.language == 'en' ? 'DD/MM/YYYY' : 'DD.MM.YYYY')
          this.data.allocationData = data
          // Transform numeric values to real numeric values, also checking NaN or null
          this.data.allocationData.forEach((row, index, rows) => {
            this.config.config.reports.trucks.columns.allocation.shouldBeNumber.forEach(num => {
              rows[index][num] = isNaN(rows[index][num]) ? 0 : parseFloat(rows[index][num])
            })
          })
          this.rollupData()
          this.loader.Hide()
        })
      } else {
        this.plandate = moment(this.data.allocationData[0][18], 'MMM DD, YYYY').format(this.config.config.language == 'en' ? 'DD/MM/YYYY' : 'DD.MM.YYYY')
        this.rollupData()
        this.loader.Hide()
      }
    })
  }

  changePlant(plant: string) : void {
    this.router.navigate(['allocation', plant], { replaceUrl: true })
  }

  ngOnInit() {
  }

  goMonth(date) : void {
    const momentum = moment(date, 'MM / YYYY')
    const year = momentum.format('YYYYMM')
    this.router.navigate(['date', year], { relativeTo: this.activatedRoute, replaceUrl: true })
  }

  getDate(month) : string {
    return moment(month, 'MM / YYYY').format('MMMM YYYY')
  }

  rollupData() {
    this.plants = this.data.allocationData.reduce((r,a) => {
      r[a[0]] = r[a[0]] || ''
      r[a[0]] = a[this.config.config.language == 'en' ? 4 : 3]
      return r
    }, {})
    if (this.plant == null || !this.plants[this.plant]) {
      this.router.navigate(['allocation', Object.keys(this.plants)[0]], { replaceUrl: true })
      return
    }
    this.title.setTitle(this.config.config.appTitle + ' - Allocation - '+(this.data.allocationData.filter(item => item[0] == this.plant)[0][this.config.config.reports.trucks.columns.allocation.plantName[this.config.config.language]]))
    const dateNow: moment.Moment = moment()
    const dateNextEightMonths: moment.Moment = moment().add(12, 'months')
    let months = {}
    const filteredRowsByPlant = this.data.allocationData.filter(aloc => aloc[0] == this.plant)
    this.years = Object.keys(filteredRowsByPlant.reduce((r,a) => {
        r[a[17].substring(0,4)] = r[a[17].substring(0,4)] || []
        return r
      }, {})
    )
    filteredRowsByPlant.forEach(aloc => {
      const alocDate = moment(aloc[17], 'YYYYMM')
      if (alocDate.isBetween(dateNow, dateNextEightMonths, null, '[]')) {
        months[aloc[17]] = []
      }
    })
    let info = []
    Object.keys(months).forEach(month => {
      const monthCorrected = moment(month, 'YYYYMM').format('MM / YYYY')
      const program = this.data.sumByIndex(filteredRowsByPlant.filter(aloc => aloc[17] == month), this.config.config.reports.trucks.columns.allocation.program)
      const allocation = this.data.sumByIndex(filteredRowsByPlant.filter(aloc => aloc[17] == month), this.config.config.reports.trucks.columns.allocation.allocation)
      info.push({
        year: moment(monthCorrected, 'MM / YYYY').format('YYYY'),
        month: monthCorrected,
        program: program,
        allocation: allocation,
        percent: this.tools.percent(allocation, program, true, true, true)
      })
    })
    this.months = info
    setTimeout(() => {
      this.ready = true
    })
  }



}