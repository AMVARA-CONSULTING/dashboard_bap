import { Component } from '@angular/core';
import { DataService } from '@services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '@services/config.service';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'dip-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public data: DataService,
    private translate: TranslateService,
    private config: ConfigService,
    private location: PlatformLocation,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    location.onPopState(event => {
      this.data.backButton = true
    })
    /*backButtonGuard.canContinue.subscribe(res => {
      if (data.title == 'about' || data.title == 'help' || data.currentLevel == 1) {
        setTimeout(() => {
          router.navigate(['order-intake'])
        })
      } else {
        setTimeout(() => {
          router.navigate(['../../'], { relativeTo: this.activatedRoute })
        })
      }
    })*/
    data.init()
    translate.setDefaultLang('en')
    translate.use(localStorage.getItem('lang') || config.config.language)
  }

  close() {
    this.data.sidenavOpened = !this.data.sidenavOpened
  }
  
}
