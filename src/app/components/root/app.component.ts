import { Component } from '@angular/core';
import { DataService } from '@services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '@services/config.service';

@Component({
  selector: 'dip-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public data: DataService,
    private translate: TranslateService,
    private config: ConfigService
    ) {
    data.init()
    translate.setDefaultLang('en')
    translate.use(localStorage.getItem('lang') || config.config.language)
  }

  close() {
    this.data.sidenavOpened = !this.data.sidenavOpened
  }
  
}
