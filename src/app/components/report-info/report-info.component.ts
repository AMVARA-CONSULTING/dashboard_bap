import { Component, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { ApiService } from '@services/api.service';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'report-info',
  templateUrl: './report-info.component.html',
  styleUrls: ['./report-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportInfoComponent implements OnChanges {

  date = '';
  id = '';
  name = new BehaviorSubject<string>('x');
  hour = '';

  constructor(
    private config: ConfigService,
    private api: ApiService
  ) { }

  @Input() type = '';
  @Input() title = '';

  ngOnChanges(changes: SimpleChanges) {
    const type = changes.type.currentValue;
    this.id = this.config.config.reports[this.config.config.target][this.config.config.scenario][type];
    if (this.api.reportDates[type].length === 0) {
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
      this.rollup(type);
    }
  }

  rollup(type: string): void {
    this.date = moment(this.api.reportDates[type], 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format('DD/MM/YYYY')
    this.hour = moment(this.api.reportDates[type], 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format('HH:mm');
    const scenarios = ['dev', 'prod'];
    const targets = ['trucks', 'vans'];
    const ids = {
      orderIntake: [],
      allocation: [],
      plantStock: [],
      productionProgram: []
    };
    // Collect ReportIDs for each Report, Scenario and Target
    // tslint:disable-next-line: forin
    for (const key of Object.keys(ids)) {
      // tslint:disable-next-line: forin
      for (const target of targets) {
        // tslint:disable-next-line: forin
        for (const scenario of scenarios) {
          if (this.config.config.reports[target][scenario][key]) {
            ids[key].push(this.config.config.reports[target][scenario][key]);
          }
        }
      }
    }
    // Check Order Intake
    // tslint:disable-next-line: curly
    if (ids.orderIntake.includes(this.id)) this.name.next('MobileCockpit_V2_14.3_dev');
    // tslint:disable-next-line: curly
    if (ids.productionProgram.includes(this.id)) this.name.next('Planning_Truck');
    // tslint:disable-next-line: curly
    if (ids.allocation.includes(this.id)) this.name.next('Allocation_Truck');
    // tslint:disable-next-line: curly
    if (ids.plantStock.includes(this.id)) this.name.next('Plant_Stock_Truck');
  }

}
