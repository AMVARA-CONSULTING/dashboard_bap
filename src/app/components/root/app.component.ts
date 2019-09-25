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
    private ac: ActivatedRoute
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
