import { Component, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { ApiService } from '@services/api.service';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { ReportTypes } from '@other/interfaces';

@Component({
  selector: 'report-info',
  templateUrl: './report-info.component.html',
  styleUrls: ['./report-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportInfoComponent implements OnChanges {

  date = new BehaviorSubject<string>('');
  id = new BehaviorSubject<string>('');
  name = new BehaviorSubject<string>('x');
  hour = new BehaviorSubject<string>('');

  constructor(
    private config: ConfigService,
    private api: ApiService
  ) { }

  @Input() type = '';
  @Input() title = '';

  ngOnChanges(changes: SimpleChanges) {
    const type = changes.type.currentValue;
    this.id.next(this.config.config.reports[this.config.config.target][this.config.config.scenario][type].id);
    if (this.api.reportDates[type].length === 0) {
      switch (type) {
        case 'orderBacklog':
          this.api.getSavedReportData(ReportTypes.OrderBacklog).subscribe(_ => this.rollup(type));
          break;
        case 'orderIntake':
          this.api.getSavedReportData(ReportTypes.OrderIntake).subscribe(_ => this.rollup(type));
          break;
        case 'productionProgram':
          this.api.getSavedReportData(ReportTypes.ProductionProgram).subscribe(_ => this.rollup(type));
          break;
        case 'allocation':
          this.api.getSavedReportData(ReportTypes.Allocation).subscribe(_ => this.rollup(type));
          break;
        case 'plantStock':
          this.api.getSavedReportData(ReportTypes.PlantStock).subscribe(_ => this.rollup(type));
          break;
        case 'orderIntakeHistory':
          this.api.getSavedReportData(ReportTypes.OrderIntakeHistory).subscribe(_ => this.rollup(type));
          break;
      }
    } else {
      this.rollup(type);
    }
  }

  rollup(type: string): void {
    this.date.next(moment(this.api.reportDates[type], 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format('DD/MM/YYYY'));
    this.hour.next(moment(this.api.reportDates[type], 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format('HH:mm'));
    const scenarios = ['int', 'prod'];
    const targets = ['trucks', 'vans'];
    const ids = {
      orderBacklog: [],
      orderIntake: [],
      allocation: [],
      plantStock: [],
      productionProgram: [],
      orderIntakeHistory: []
    };
    // Collect ReportIDs for each Report, Scenario and Target
    // tslint:disable-next-line: forin
    for (const key of Object.keys(ids)) {
      // tslint:disable-next-line: forin
      for (const target of targets) {
        // tslint:disable-next-line: forin
        for (const scenario of scenarios) {
          if (this.config.config.reports[target][scenario][key].id) {
            ids[key].push(this.config.config.reports[target][scenario][key].id);
          }
        }
      }
    }
    // Check Order Intake
    // tslint:disable-next-line: curly
    if (ids.orderIntake.includes(this.id.getValue())) this.name.next('MobileCockpit_V2_14.3_dev');
    // tslint:disable-next-line: curly
    if (ids.productionProgram.includes(this.id.getValue())) this.name.next('Planning_Truck');
    // tslint:disable-next-line: curly
    if (ids.allocation.includes(this.id.getValue())) this.name.next('Allocation_Truck');
    // tslint:disable-next-line: curly
    if (ids.plantStock.includes(this.id.getValue())) this.name.next('Plant_Stock_Truck');
    // tslint:disable-next-line: curly
    if (ids.orderBacklog.includes(this.id.getValue())) this.name.next('Order_Backlog_Truck');
    // tslint:disable-next-line: curly
    if (ids.orderIntakeHistory.includes(this.id.getValue())) this.name.next('Order_Intake_History');
  }

}
