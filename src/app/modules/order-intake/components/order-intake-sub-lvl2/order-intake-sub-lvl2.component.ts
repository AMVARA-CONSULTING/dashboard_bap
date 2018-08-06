import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private config: ConfigService
  ) {
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

  groupInfo: any = {}

  rollupData(): void {
    let rows
    if (this.ZoneID != null) {
      rows = this.data.classifyByIndex(this.data.orderIntakeData, 0)[this.ZoneID]
    } else {
      rows = this.data.classifyByIndex(this.data.orderIntakeData, 1)[this.PlantID]
    }
    let zoneRows = this.data.orderIntakeData.reduce((r, a) => {
        r[a[this.config.config.reports.trucks.columns.orderIntake.groupKey]] = r[a[this.config.config.reports.trucks.columns.orderIntake.groupKey]] || []
        r[a[this.config.config.reports.trucks.columns.orderIntake.groupKey]].push(a)
        return r
    }, {})[rows[0][this.config.config.reports.trucks.columns.orderIntake.groupKey]]
    let plantRows = this.data.orderIntakeData.reduce((r, a) => {
      r[a[this.config.config.reports.trucks.columns.orderIntake.plantKey]] = r[a[this.config.config.reports.trucks.columns.orderIntake.plantKey]] || []
      r[a[this.config.config.reports.trucks.columns.orderIntake.plantKey]].push(a)
      return r
    }, {})[rows[0][this.config.config.reports.trucks.columns.orderIntake.plantKey]]
    console.log(zoneRows)
    this.groupInfo = {
      zone: this.ZoneID != null,
      zoneID: rows[0][this.config.config.reports.trucks.columns.orderIntake.groupKey],
      plantID: rows[0][this.config.config.reports.trucks.columns.orderIntake.plantKey],
      zoneTitle: rows[0][this.config.config.reports.trucks.columns.orderIntake.groupName[this.config.config.language]],
      plantTitle: rows[0][this.config.config.reports.trucks.columns.orderIntake.plantName[this.config.config.language]],
      zoneActual: this.data.sumByIndex(zoneRows, this.config.config.reports.trucks.columns.orderIntake.actual),
      zonePrevious: this.data.sumByIndex(zoneRows, this.config.config.reports.trucks.columns.orderIntake.previous),
      plantActual: this.data.sumByIndex(plantRows, this.config.config.reports.trucks.columns.orderIntake.actual),
      plantPrevious: this.data.sumByIndex(plantRows, this.config.config.reports.trucks.columns.orderIntake.previous)
    }
    console.log(this.groupInfo)
    
    setTimeout(() => this.ready = true)
  }

  ngOnInit() {
  }

}
