import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';

@Component({
  selector: 'order-intake-sub-lvl2',
  templateUrl: './order-intake-sub-lvl2.component.html',
  styleUrls: ['./order-intake-sub-lvl2.component.scss']
})
export class OrderIntakeSubLvl2Component implements OnInit {

  ZoneID: any = null
  PlantID: any = null

  ready: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private loader: LoadingService,
    public data: DataService,
    private api: ApiService,
    private config: ConfigService,
    private router: Router
  ) {
    // Show the loader while getting/loading the data
    this.loader.Show()
    this.activatedRoute.params.subscribe(params => {
      if (this.activatedRoute.snapshot.data.zone) {
        this.ZoneID = params.id
      } else {
        this.PlantID = params.id
      }
      // If no Order Intake rows were found, get them
      if (this.data.orderIntakeData.length == 0) {
        this.api.getOrderIntakeData().subscribe(data => {
          this.data.orderIntakeData = data
          // Transform numeric values to real numeric values, also checking NaN or null
          this.data.orderIntakeData.forEach((row, index, rows) => {
            rows[index][12] = isNaN(rows[index][12]) ? 0 : parseFloat(rows[index][12])
            rows[index][13] = isNaN(rows[index][13]) ? 0 : parseFloat(rows[index][13])
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

  groupInfo: any

  rollupData(): void {
    let rows
    // Reduce rows depending on route, by Plant or by Zone
    if (this.ZoneID != null) {
      rows = this.data.classifyByIndex(this.data.orderIntakeData, 0)[this.ZoneID]
    } else {
      rows = this.data.classifyByIndex(this.data.orderIntakeData, 1)[this.PlantID]
    }
    // Gettings rows only for the zone selected
    let zoneRows = this.data.orderIntakeData.reduce((r, a) => {
        r[a[this.config.config.reports.trucks.columns.orderIntake.groupKey]] = r[a[this.config.config.reports.trucks.columns.orderIntake.groupKey]] || []
        r[a[this.config.config.reports.trucks.columns.orderIntake.groupKey]].push(a)
        return r
    }, {})[rows[0][this.config.config.reports.trucks.columns.orderIntake.groupKey]]
    // Getting rows only for the plant selected
    let plantRows = this.data.orderIntakeData.reduce((r, a) => {
      r[a[this.config.config.reports.trucks.columns.orderIntake.plantKey]] = r[a[this.config.config.reports.trucks.columns.orderIntake.plantKey]] || []
      r[a[this.config.config.reports.trucks.columns.orderIntake.plantKey]].push(a)
      return r
    }, {})[rows[0][this.config.config.reports.trucks.columns.orderIntake.plantKey]]
    console.log(zoneRows)
    // Collect data info for data headers
    this.groupInfo = {
      zone: this.ZoneID != null,
      zoneRows: zoneRows,
      plantRows: plantRows,
      rowsPlain: rows,
      zoneID: rows[0][this.config.config.reports.trucks.columns.orderIntake.groupKey],
      plantID: rows[0][this.config.config.reports.trucks.columns.orderIntake.plantKey],
      totalActual: this.data.sumByIndex(this.data.orderIntakeData, 12),
      totalPrevious: this.data.sumByIndex(this.data.orderIntakeData, 13),
      zoneTitle: rows[0][this.config.config.reports.trucks.columns.orderIntake.groupName[this.config.config.language]],
      plantTitle: rows[0][this.config.config.reports.trucks.columns.orderIntake.plantName[this.config.config.language]],
      zoneActual: this.data.sumByIndex(zoneRows, this.config.config.reports.trucks.columns.orderIntake.actual),
      zonePrevious: this.data.sumByIndex(zoneRows, this.config.config.reports.trucks.columns.orderIntake.previous),
      plantActual: this.data.sumByIndex(plantRows, this.config.config.reports.trucks.columns.orderIntake.actual),
      plantPrevious: this.data.sumByIndex(plantRows, this.config.config.reports.trucks.columns.orderIntake.previous)
    }
    this.groupInfo.progress1 = this.ZoneID != null ?
      this.percent(this.groupInfo.zoneActual, this.groupInfo.totalActual) : 
      this.percent(this.groupInfo.plantActual, this.groupInfo.zoneActual)
    this.groupInfo.progress2 = this.ZoneID != null ?
      this.percent(this.groupInfo.zonePrevious, this.groupInfo.totalPrevious) :
      this.percent(this.groupInfo.plantPrevious, this.groupInfo.zonePrevious)
    console.log(this.groupInfo)
    
    // Tell the DOM it's ready to rock ’n’ roll !
    setTimeout(() => this.ready = true)
  }

  percent(part: number, total: number) : number {
    return parseInt(((part * 100) / total).toFixed(0))
  }

  ngOnInit() {
  }

  return() : void {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute })
  }

}
