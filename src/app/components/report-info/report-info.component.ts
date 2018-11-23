import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { ApiService } from '@services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'report-info',
  templateUrl: './report-info.component.html',
  styleUrls: ['./report-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportInfoComponent implements OnInit, OnChanges {

  constructor(
    private config: ConfigService,
    private api: ApiService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  @Input() type: string = ''
  @Input() title: string = ''

  ngOnChanges(changes: SimpleChanges) {
    const type = changes.type.currentValue
    this.id = this.config.config.reports[this.config.config.target][this.config.config.scenario][type]
    if (this.api.reportDates[type].length == 0) {
      switch (type) {
        case "orderIntake":
          this.api.getOrderIntakeData(this.config.config.reports[this.config.config.target][this.config.config.scenario].orderIntake).subscribe(_ => this.rollup(type))
          break;
        case "productionProgram":
          this.api.getProductionProgramData(this.config.config.reports[this.config.config.target][this.config.config.scenario].productionProgram).subscribe(_ => this.rollup(type))
          break
        case "allocation":
          this.api.getAllocationData(this.config.config.reports[this.config.config.target][this.config.config.scenario].allocation).subscribe(_ => this.rollup(type))
          break
        case "plantStock":
          this.api.getPlantStockData(this.config.config.reports[this.config.config.target][this.config.config.scenario].plantStock).subscribe(_ => this.rollup(type))
          break
      }
    } else {
      this.rollup(type)
    }
  }

  rollup(type: string): void {
    this.date = moment(this.api.reportDates[type], 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format('DD/MM/YYYY')
    this.hour = moment(this.api.reportDates[type], 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format('HH:mm')
    switch (this.id) {
      case "i163A764B930D4E748310CF5053D29578":
        this.name = 'MobileCockpit_V2_14.3_dev'
        break
      case "i5F3D9FCAF8054F5790152C1251DE3552":
        this.name = 'Planning_Truck_new'
        break
      case "i464B15BB96434390A9D6C35C67886434":
        this.name = 'Allocation_Truck'
        break
      case "i63BB42DBA849409A9E68354C67DF4AE7":
        this.name = 'Plant_Stock_Truck'
        break
      default:
    }
    this.ref.detectChanges()
  }

  date: string = ''
  id: string = ''
  name: string = 'x'
  hour: string = ''

}
