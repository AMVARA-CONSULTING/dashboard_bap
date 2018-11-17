import { Component, OnInit, VERSION, ChangeDetectionStrategy } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { DataService } from '@services/data.service';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(swiperight)': 'data.go("plant-stock")',
    '(swipeleft)': 'data.go("help")'
  }
})
export class AboutComponent implements OnInit {

  constructor(
    public config: ConfigService,
    private translate: TranslateService,
    private snack: MatSnackBar,
    public data: DataService,
    private api: ApiService
  ) {
    forkJoin(
      this.api.getPlantStockData(this.config.config.reports[this.config.config.target][this.config.config.scenario].plantStock),
      this.api.getProductionProgramData(this.config.config.reports[this.config.config.target][this.config.config.scenario].productionProgram),
      this.api.getAllocationData(this.config.config.reports[this.config.config.target][this.config.config.scenario].allocation),
      this.api.getOrderIntakeData(this.config.config.reports[this.config.config.target][this.config.config.scenario].orderIntake)
    ).subscribe(_ => {
      this.reportDates = Object.assign({}, this.api.reportDates)
      console.log("AMVARA Reports", this.reportDates)
    })
    data.currentLevel = 1
    this.version = VERSION.full
  }

  version

  reportDates

  ngOnInit() {

  }

  setLang(code: string): void {
    localStorage.setItem('lang', code)
    this.translate.use(code)
    this.snack.open('Language changed successfully!', 'OK', { duration: 3000 });
  }

  reloadLang(): void {
    this.translate.reloadLang(this.config.config.language)
    this.snack.open('Language reloaded successfully!', 'OK', { duration: 3000 });
  }

  showConfig: boolean = false

}
