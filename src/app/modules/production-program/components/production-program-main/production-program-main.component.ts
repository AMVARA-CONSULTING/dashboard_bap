import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';
import { ApiService } from '@services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@services/config.service';

@Component({
  selector: 'production-program-main',
  templateUrl: './production-program-main.component.html',
  styleUrls: ['./production-program-main.component.scss']
})
export class ProductionProgramMainComponent implements OnInit {

  constructor(
    private loader: LoadingService,
    public data: DataService,
    private api: ApiService,
    private route: ActivatedRoute,
    private config: ConfigService,
    private router: Router
  ) { }

  year: string = ''

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.year = params.get('year')
      this.loader.Show()
      // If no Production rows were found, get them
      if (this.data.productionProgramData.length == 0) {
        this.api.getProductionProgramData().subscribe(data => {
          this.data.productionProgramData = data
          // Transform numeric values to real numeric values, also checking NaN or null
          this.data.productionProgramData.forEach((row, index, rows) => {
            rows[index][22] = isNaN(rows[index][22]) ? 0 : parseFloat(rows[index][22])
          })
          this.rollupData()
          this.loader.Hide()
        })
      } else {
        this.rollupData()
        this.loader.Hide()
      }
    })
  }
  
  byYear: any
  years: string[] = []

  rowsGroupsGlobal: any
  rowsGroupsDetail: any = {}


  rollupData() : void {
    this.byYear = this.data.classifyByIndex(this.data.productionProgramData, 13)
    this.years = Object.keys(this.byYear)
    const yearCache = localStorage.getItem('production-year')
    if (yearCache && this.year != yearCache) this.router.navigate(['/production-program', yearCache])
    this.year = yearCache
    if (!this.years.includes(this.year)) {
      localStorage.setItem('production-year', this.years[0])
      this.router.navigate(['/production-program', this.years[0]])
    } else {
      this.rowsGroupsGlobal = this.data.classifyByIndex(this.data.productionProgramData.filter(dat => dat[13] == this.year), 0)
      for (var group in this.rowsGroupsGlobal) {
        this.rowsGroupsDetail[group] = this.data.classifyByIndex(this.rowsGroupsGlobal[group], 3)
      }
      console.log(this.rowsGroupsGlobal)
      console.log(this.rowsGroupsDetail)
      // Tell the DOM it's ready to rock ’n’ roll !
      setTimeout(() => this.ready = true)
    }
  }
  
  ready: boolean = false

}
