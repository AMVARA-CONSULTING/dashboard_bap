import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '@services/config.service';
import { LocationStrategy } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { timer, interval } from 'rxjs';
import { ApiService } from '@services/api.service';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { HeaderLink } from '@other/interfaces';
import { CognosService } from '@services/cognos.service';

@Component({
  selector: 'dip-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public data: DataService,
    private translate: TranslateService,
    private config: ConfigService,
    private _location: LocationStrategy,
    private router: Router,
    private api: ApiService,
    private http: HttpClient,
    private ac: ActivatedRoute,
    private _cognos: CognosService
  ) {
    if (this.config.config.simulateUnauthorized > 0) {
      timer(this.config.config.simulateUnauthorized).subscribe(_ => this.api.authorized = false)
    }
    if (this.api.corpintra || location.hostname == 'localhost') {
      // Heartbeat
      this.api.heartbeat = interval(config.config.heartbeat).subscribe(_ =>
        this.http.get(location.pathname + 'assets/keep.alive.txt', { observe: 'response', responseType: 'text' }).pipe(retry(3))
          .subscribe()
      )
    }
    this._location.onPopState(() => {
      if (this.data.currentLevel == 1 && this.data.title != 'order_intake') {
        this.router.navigate(['order-intake'], { replaceUrl: true, queryParamsHandling: 'merge' })
      }
      //history.go(1)
    })
    data.init()
    this.translate.setDefaultLang('en')
    this.translate.use(localStorage.getItem('lang') || config.config.language)
    if (config.config.debug) console.log(location.hash)
    // If going to a report, check it has access, and if not, redirect to another one with access
    if (location.hash.indexOf('help') == -1 && location.hash.indexOf('about') == -1) {
      const links = this._cognos.getLinksWithAccess(Object.assign({}, this.config.config))
      if (links.length > 0) {
        this.router.navigate([links[0].link])
      } else {
        // Unable to access to any report, then main page is Help
        this.router.navigate(['/help'])
      }
    }
  }

  ngOnInit() {
    /*if (this.sw.isEnabled) {
      this.sw.available.subscribe(() => {
        console.log("%cNew version detected!", "color:green;")
        let dialogRef = this.dialog.open(NewUpdateComponent, {
          disableClose: true,
          panelClass: 'newUpdate'
        })
        dialogRef.afterClosed().subscribe(confirm => {
          if (confirm) {
            window.location.reload()
          }
        })
      })
    }*/
  }

  preventUpdate: boolean = false

  close() {
    this.data.sidenavOpened = !this.data.sidenavOpened
  }

}
