import { Component, OnInit, VERSION, ChangeDetectionStrategy } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '@services/data.service';
// import  * as packages from '../../../../../package.json';
import { CognosService } from '@services/cognos.service';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngxs/store';
import { ConfigActions } from '@store/config.state';
// import { formatVersion } from '@other/functions';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(swiperight)': 'data.goFrom("about", $event)',
    '(swipeleft)': 'data.goFrom("about", $event)'
  }
})
export class AboutComponent implements OnInit {

  constructor(
    public config: ConfigService,
    private translate: TranslateService,
    private snack: MatSnackBar,
    private data: DataService,
    public _cognos: CognosService,
    private _store: Store
  ) {
    this.data.currentLevel = 1;
    // this.angularVersion = VERSION.full;
    // this.momentVersion = formatVersion(packages.moment);
    // this.hammerVersion = formatVersion(dependencies.hammerjs);
    // this.ngx_translateVersion = formatVersion(packages['@ngx-translate/core']);
    // this.progressVersion = formatVersion(packages['angular-svg-round-progressbar']);
    // this.connectionVersion = formatVersion(packages['ng-connection-service']);
  }

  connectionVersion;
  progressVersion;
  ngx_translateVersion;
  momentVersion;
  hammerVersion;
  angularVersion;
  reportDates;

  ngOnInit() {
    // Only show available reports info, this prevents the user from seeing things it shouldn't see
    let reportInfos: AboutReport[] = [
      { shownTitle: this.translate.instant('menu.order_intake'), title: 'Order Intake', type: 'orderIntake' },
      { shownTitle: this.translate.instant('menu.order_backlog'), title: 'Order Backlog', type: 'orderBacklog' },
      { shownTitle: this.translate.instant('menu.production_program'), title: 'Production program', type: 'productionProgram' },
      { shownTitle: this.translate.instant('menu.allocation'), title: 'Allocation', type: 'allocation' },
      { shownTitle: this.translate.instant('menu.plant_stock'), title: 'Plant stock', type: 'plantStock' }
    ];
    const availableLinks = this._cognos.getLinksWithAccess().map(link => link.text);
    if (this.config.config.debug) {
      console.log('Available links:', availableLinks);
    }
    reportInfos = reportInfos.filter(report => availableLinks.indexOf(report.title.toLowerCase().replace(/\ /g, '_')) > -1);
    this.reportInfos.next(reportInfos);
    if (this.config.config.debug) {
      console.log('Available reports:', reportInfos);
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  
  // Added delay to setLang and reloadLang because pop up doesn't have enough time to get the chosen language, so instead it would the the default/previous
  setLang(code: string): void {
    localStorage.setItem('lang', code);
    this.translate.use(code);
    this._store.dispatch( new ConfigActions.SetParameter('language', code) );
    this.delay(300).then(any=>{
      this.snack.open(this.translate.instant('help.language_change'), 'OK', { duration: 3000 });
    });
  }

  reloadLang(): void {
    this.translate.reloadLang(this.config.config.language);
    this.delay(300).then(any=>{
      this.snack.open(this.translate.instant('help.language_reload'), 'OK', { duration: 3000 });
    });
  }

  reportInfos = new BehaviorSubject<AboutReport[]>([]);

}

interface AboutReport {
  shownTitle: string;
  title: string;
  type: string;
}
