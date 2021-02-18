import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { ApiService } from '@services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@services/config.service';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { ReportTypes } from '@other/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { getPlanDateWithMoment } from '@other/functions';

@Component({
  selector: 'production-program-main',
  templateUrl: './production-program-main.component.html',
  styleUrls: ['./production-program-main.component.scss'],
  animations: [
    trigger('overview', [
      state('false', style({
        opacity: 0
      })),
      state('true', style({
        opacity: 1
      })),
      transition('* <=> *', animate('1000ms ease-in-out', style({ opacity: 1 })))
    ]),
    trigger('list', [
      transition('* => *', [
        query('.zone:enter', style({ opacity: 0 }), { optional: true }),
        query('.zone:enter', stagger('200ms', animate('300ms ease-in', style({ opacity: 1 }))), { optional: true })
      ])
    ])
  ],
  host: {
    '(swiperight)': 'data.goFrom("production_program", $event)',
    '(swipeleft)': 'data.goFrom("production_program", $event)'
  }
})
export class ProductionProgramMainComponent implements OnInit {

  constructor(
    public data: DataService,
    private api: ApiService,
    private route: ActivatedRoute,
    private config: ConfigService,
    private router: Router,
    private translate: TranslateService,
    private title: Title
  ) {
    this.title.setTitle(this.config.config.appTitle + ' - ' + this.translate.instant('menu.production_program'))
  }

  year: string = ''

  plandate: string = ''

  // Names of the routes for each level
  main_route: string = 'employees'
  main_route_slash: string = '/employees'
  general_route: string = 'zone'
  second_level_route: string = 'region'

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.year = params.get('year')
      // If no Production rows were found, get them
      if (this.data.productionProgramData.length === 0) {
        this.api.getSavedReportData(ReportTypes.ProductionProgram).subscribe(res => {
          this.plandate = getPlanDateWithMoment(res[0][14], moment);
          this.data.productionProgramData = res;
          this.rollupData()
        })
      } else {
        this.plandate = getPlanDateWithMoment(this.data.productionProgramData[0][14], moment)
        this.rollupData()
      }
    })
  }

  resultsCount: number = 0

  getKeysCount() {
    return Object.keys(this.rowsGroupsGlobal).length || 0
  }

  byYear: any
  years: string[] = []

  changeYear(year: string, years?: string[]): void {
    localStorage.setItem('production-year', year)
    this.router.navigate([this.main_route, year], { replaceUrl: true })
  }

  rowsGroupsGlobal: any
  rowsGroupsDetail: any = {}


  rollupData(): void {
    this.byYear = this.data.classifyByIndex(this.data.productionProgramData, 13)
    this.years = Object.keys(this.byYear)
    const yearCache = localStorage.getItem('production-year')
    if (yearCache && this.year != yearCache) this.router.navigate([this.main_route_slash, yearCache], { replaceUrl: true })
    this.year = yearCache
    if (this.years.indexOf(this.year) == -1) {
      localStorage.setItem('production-year', this.years[0])
      this.router.navigate([this.main_route_slash, this.years[0]], { replaceUrl: true })
    } else {
      this.rowsGroupsGlobal = this.data.classifyByIndex(this.data.productionProgramData.filter(dat => dat[13] == this.year), 0)
      for (var group in this.rowsGroupsGlobal) {
        this.rowsGroupsDetail[group] = this.data.classifyByIndex(this.rowsGroupsGlobal[group], 3)
      }
      this.resultsCount = Object.keys(this.rowsGroupsGlobal).length
      // Tell the DOM it's ready to rock ’n’ roll !
      setTimeout(() => this.ready = true)
    }
  }

  goZone(ZoneID: string): void {
    this.router.navigate([this.general_route, ZoneID], { relativeTo: this.route, replaceUrl: true })
  }

  goPlant(PlantID: string): void {
    this.router.navigate([this.second_level_route, PlantID], { relativeTo: this.route, replaceUrl: true })
  }

  ready: boolean = false

}
