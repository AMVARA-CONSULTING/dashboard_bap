import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { LoadingService } from '@services/loading.service';
import { Title } from '@angular/platform-browser';
import { ApiService } from '@services/api.service';
import * as moment from 'moment';
import { ConfigService } from '@services/config.service';
import { ToolsService } from '@services/tools.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'allocation-main',
  templateUrl: './allocation-main.component.html',
  styleUrls: ['./allocation-main.component.scss']
})
export class AllocationMainComponent implements OnInit {

  plandate: string = ''
  plants

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
    moment.locale('en')
    this.title.setTitle('DIP - Allocation')
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
    this.router.navigate(['allocation', plant])
  }

  ngOnInit() {
  }

  rollupData() {
    this.plants = this.data.allocationData.reduce((r,a) => {
      r[a[0]] = r[a[0]] || ''
      r[a[0]] = a[this.config.config.language == 'en' ? 4 : 3]
      return r
    }, {})
    if (this.plant == null || !this.plants[this.plant]) {
      this.router.navigate(['allocation', Object.keys(this.plants)[0]])
    }
    this.title.setTitle('DIP - Allocation - '+(this.data.allocationData.filter(item => item[0] == this.plant)[0][this.config.config.reports.trucks.columns.allocation.plantName[this.config.config.language]]))
    const dateNow: moment.Moment = moment()
    const dateNextEightMonths: moment.Moment = moment().add(12, 'months')
    let months = {}
    const filteredRowsByPlant = this.data.allocationData.filter(aloc => aloc[0] == this.plant)
    filteredRowsByPlant.forEach(aloc => {
      const alocDate = moment(aloc[17], 'YYYYMM')
      if (alocDate.isBetween(dateNow, dateNextEightMonths, null, '[]')) {
        months[aloc[17]] = []
      }
    })
    let info = []
    Object.keys(months).forEach(month => {
      const monthCorrected = moment(month, 'YYYYMM').format('MM / YYYY')
      console.log(filteredRowsByPlant.filter(aloc => aloc[17] == month))
      const program = this.data.sumByIndex(filteredRowsByPlant.filter(aloc => aloc[17] == month), this.config.config.reports.trucks.columns.allocation.program)
      const allocation = this.data.sumByIndex(filteredRowsByPlant.filter(aloc => aloc[17] == month), this.config.config.reports.trucks.columns.allocation.allocation)
      info.push({
        month: monthCorrected,
        program: program,
        allocation: allocation,
        percent: this.tools.percent(allocation, program, true, true, true)
      })
    })
    console.log(info)
    this.months = info
  }



}