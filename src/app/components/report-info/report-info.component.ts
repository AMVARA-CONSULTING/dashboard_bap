import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
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
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  @Input() type: string = ''
  @Input() title: string = ''

  ngOnChanges(changes: SimpleChanges) {
    const type = changes.type.currentValue
    this.id = this.config.config.reports[this.config.config.target][this.config.config.scenario][type]
    this.date = moment(this.api.reportDates[type], 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format('DD/MM/YYYY')
    this.hour = moment(this.api.reportDates[type], 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format('HH:mm')
    switch(this.id) {
      case "i163A764B930D4E748310CF5053D29578":
        this.name = 'MobileCockpit_V2_14.3_dev'
        break
      case "i1CB7F34FB34C457AA79DAC5EF88BB136":
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
  }

  date: string = ''
  id: string = ''
  name: string = 'x'
  hour: string = ''

}
