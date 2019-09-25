import { Component, OnInit, VERSION, ChangeDetectionStrategy } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { DataService } from '@services/data.service';
import * as moment from 'moment';
import { dependencies } from '../../../../../../package.json';
import { ToolsService } from '@services/tools.service.js';

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
    private _tools: ToolsService
  ) {
    data.currentLevel = 1
    this.angularVersion = VERSION.full
    // @ts-ignore
    this.momentVersion = this._tools.formatVersion(dependencies.moment)
    this.hammerVersion = this._tools.formatVersion(dependencies.hammerjs)
    this.ngx_translateVersion = this._tools.formatVersion(dependencies["@ngx-translate/core"])
    this.progressVersion = this._tools.formatVersion(dependencies["angular-svg-round-progressbar"])
    this.connectionVersion = this._tools.formatVersion(dependencies["ng-connection-service"])
    this.jsonViewerVersion = this._tools.formatVersion(dependencies["ngx-json-viewer"])
  }

  jsonViewerVersion
  connectionVersion
  progressVersion
  ngx_translateVersion
  momentVersion
  hammerVersion
  angularVersion
''
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
