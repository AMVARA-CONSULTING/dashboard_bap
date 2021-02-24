import { Component } from '@angular/core';
import { DataService } from '@services/data.service';
import { Title } from '@angular/platform-browser';
import { ApiService } from '@services/api.service';
import * as moment from 'moment';
import { ConfigService } from '@services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, query, style, stagger, animate, state } from '@angular/animations';
import { ReportTypes } from '@other/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { getPlanDateWithMoment, percent } from '@other/functions';

@Component({
  selector: 'allocation-lvl3',
  templateUrl: './allocation-lvl3.component.html',
  styleUrls: ['./allocation-lvl3.component.scss'],
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
    '(swiperight)': 'data.goFrom("allocation", $event)',
    '(swipeleft)': 'data.goFrom("allocation", $event)'
  }
})
export class AllocationLvl3Component {

  percent = percent;

  ready: boolean = false

  plandate: string = ''
  plants

  years: string[] = []

  months = []

  plant: string
  date: string

  type: string
  region_id: string

  monthMomentum: string = ''

  // Names of the routes for each level
  main_route: string = 'covid'
  main_route_slash: string = '/covid'
  second_level_route: string = 'date'
  sub_level_a: string = 'region'
  sub_level_b: string = 'city'

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
    this.title.setTitle(this.config.config.appTitle + ' - ' + this.translate.instant('menu.allocation'))
    this.activatedRoute.paramMap.subscribe(params => {
      this.plant = params.get('plant')
      this.date = params.get(this.second_level_route)
      this.type = params.get('type')
      this.region_id = decodeURI(params.get('region_id'))
      // If no Allocation rows were found, get them
      if (this.data.allocationData.length == 0) {
        this.api.getSavedReportData(ReportTypes.Allocation).subscribe(res => {
          this.plandate = getPlanDateWithMoment(res[0][18], moment)
          this.data.allocationData = res
          this.rollupData()
        })
      } else {
        this.plandate = getPlanDateWithMoment(this.data.allocationData[0][18], moment)
        this.rollupData()
      }
    })
  }

  changePlant(plant: string): void {
    this.router.navigate([this.main_route, plant, this.second_level_route, this.date, this.type, this.region_id], { replaceUrl: true })
  }

  getDate(month): string {
    return moment(month, 'MM / YYYY').format('MMMM YYYY')
  }

  rollupData() {
    this.plants = this.data.allocationData.reduce((r, a) => {
      r[a[0]] = r[a[0]] || ''
      r[a[0]] = a[this.config.config.language == 'en' ? 4 : 3]
      return r
    }, {})
    if (this.plant == null || !this.plants[this.plant]) {
      this.router.navigate([this.main_route, Object.keys(this.plants)[0]], { replaceUrl: true })
      return
    }
    this.title.setTitle(this.config.config.appTitle + ' - ' + this.translate.instant('menu.allocation') + ' - ' + (this.data.allocationData.filter(item => item[0] == this.plant)[0][this.config.config.reports.trucks.columns.allocation.plantName[this.config.config.language]]))
    const dateNow: moment.Moment = moment()
    const dateNextEightMonths: moment.Moment = moment().add(12, 'months')
    let months = {}
    let filteredRowsByPlant = this.data.allocationData.filter(aloc => aloc[0] == this.plant)
    this.years = Object.keys(filteredRowsByPlant.reduce((r, a) => {
      r[a[17].toString().substring(0, 4)] = r[a[17].toString().substring(0, 4)] || []
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
        percent: percent(allocation, program, true, true, true)
      })
    })
    const filteredRowsByPlant_copy = filteredRowsByPlant.concat()
    filteredRowsByPlant = filteredRowsByPlant.filter(item => item[this.config.config.reports.trucks.columns.allocation.yearMonth].replace(/\-/,'') == this.date)
    this.totalProgram = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.allocation.program)
    this.totalAllocation = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.allocation.allocation)
    const filteredRowsByPlant_copy2 = filteredRowsByPlant.concat()
    if (this.type == this.sub_level_a) {
      filteredRowsByPlant = filteredRowsByPlant.filter(item => item[this.config.config.reports.trucks.columns.allocation.regionName[this.config.config.language]] == this.region_id)
    } else {
      filteredRowsByPlant = filteredRowsByPlant.filter(item => item[this.config.config.reports.trucks.columns.allocation.productName[this.config.config.language]] == this.region_id)
    }
    this.subtotalProgram = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.allocation.program)
    this.subtotalAllocation = this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.allocation.allocation)
    this.partNumber = this.data.sumByIndex(filteredRowsByPlant_copy2, this.config.config.reports.trucks.columns.allocation.allocation)
    this.percentAllocation = +percent(this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.allocation.allocation), this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.allocation.program), false, false, false)
    this.percentProgram = +percent(this.data.sumByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.allocation.program), this.data.sumByIndex(filteredRowsByPlant_copy2, this.config.config.reports.trucks.columns.allocation.program), false, false, false)
    this.programNumber = this.data.sumByIndex(filteredRowsByPlant_copy2, this.config.config.reports.trucks.columns.allocation.program)
    this.monthMomentum = moment(this.date, 'YYYYMM').format('MMMM YYYY')
    if (this.type == this.sub_level_a) {
      this.rows = this.data.classifyByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.allocation.productName[this.config.config.language])
    } else {
      this.rows = this.data.classifyByIndex(filteredRowsByPlant, this.config.config.reports.trucks.columns.allocation.regionName[this.config.config.language])
    }
    this.months = info
    setTimeout(() => {
      this.ready = true
    })

  }

  exchangeType(key): void {
    if (this.type == this.sub_level_a) {
      this.router.navigate(['../../', this.sub_level_b, key], { relativeTo: this.activatedRoute, replaceUrl: true })
    } else {
      this.router.navigate(['../../', this.sub_level_a, key], { relativeTo: this.activatedRoute, replaceUrl: true })
    }
  }

  returnToMain(): void {
    this.router.navigate(['../../../../'], { relativeTo: this.activatedRoute, replaceUrl: true })
  }

  returnToParent(): void {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute, replaceUrl: true })
  }

  percentAllocation: number | string = 0
  percentProgram: number | string = 0
  partNumber: number = 0
  programNumber: number = 0

  rows = []

  regions
  products

  totalProgram: number = 0
  totalAllocation: number = 0
  subtotalProgram: number = 0
  subtotalAllocation: number = 0


}
