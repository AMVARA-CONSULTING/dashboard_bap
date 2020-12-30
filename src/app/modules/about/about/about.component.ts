import { Component, OnInit, VERSION, ChangeDetectionStrategy } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '@services/data.service';
import { dependencies } from '../../../../../package.json';
import { CognosService } from '@services/cognos.service';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngxs/store';
import { ConfigActions } from '@store/config.state';
import { formatVersion } from '@other/functions';

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
    this.angularVersion = VERSION.full;
    this.momentVersion = formatVersion(dependencies.moment);
    this.hammerVersion = formatVersion(dependencies.hammerjs);
    this.ngx_translateVersion = formatVersion(dependencies['@ngx-translate/core']);
    this.progressVersion = formatVersion(dependencies['angular-svg-round-progressbar']);
    this.connectionVersion = formatVersion(dependencies['ng-connection-service']);
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
      { title: 'Order Intake', type: 'orderIntake' },
      { title: 'Order Backlog', type: 'orderBacklog' },
      { title: 'Production program', type: 'productionProgram' },
      { title: 'Allocation', type: 'allocation' },
      { title: 'Plant stock', type: 'plantStock' }
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

  setLang(code: string): void {
    localStorage.setItem('lang', code);
    this.translate.use(code);
    this._store.dispatch( new ConfigActions.SetParameter('language', code) );
    this.snack.open('Language changed successfully!', 'OK', { duration: 3000 });
  }

  reloadLang(): void {
    this.translate.reloadLang(this.config.config.language);
    this.snack.open('Language reloaded successfully!', 'OK', { duration: 3000 });
  }

  reportInfos = new BehaviorSubject<AboutReport[]>([]);

}

interface AboutReport {
  title: string;
  type: string;
}
