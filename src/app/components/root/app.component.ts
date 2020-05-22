import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '@services/config.service';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { HttpClient } from '@angular/common/http';
import { HeaderLink } from '@other/interfaces';
import { CognosService } from '@services/cognos.service';
import { timer } from 'rxjs/internal/observable/timer';
import { interval } from 'rxjs/internal/observable/interval';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { retry } from 'rxjs/internal/operators/retry';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'dip-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  preventUpdate = false;
  reports = new BehaviorSubject<HeaderLink[]>([]);

  constructor(
    public data: DataService,
    private translate: TranslateService,
    private config: ConfigService,
    private _location: LocationStrategy,
    private router: Router,
    private api: ApiService,
    private http: HttpClient,
    private _cognos: CognosService
  ) {
    if (this.config.config.simulateUnauthorized > 0) {
      timer(this.config.config.simulateUnauthorized).subscribe(_ => this.api.authorized = false);
    }
    if (this.api.corpintra || location.hostname === 'localhost') {
      // Heartbeat
      this.api.heartbeat = interval(config.config.heartbeat).subscribe(_ =>
        this.http.get(location.pathname + 'assets/keep.alive.txt', { observe: 'response', responseType: 'text' }).pipe(retry(3))
          .subscribe()
      );
    }
    this._location.onPopState(() => {
      if (this.data.currentLevel === 1 && this.data.title !== 'order_intake') {
        this.router.navigate(['order-intake'], { replaceUrl: true, queryParamsHandling: 'merge' });
      }
    });
    data.init();
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') || config.config.language);
    // If going to a report, check it has access, and if not, redirect to another one with access
    const links = this._cognos.getLinksWithAccess({ ...this.config.config });
    this.reports.next(links);
    if (!location.hash.includes('help') && !location.hash.includes('about')) {
      if (links.length > 0) {
        this.router.navigate([links[0].link]);
      } else {
        // Unable to access to any report, then main page is Help
        this.router.navigate(['/help']);
      }
    }
  }

  ngOnInit() {
    this.data.lightTheme.valueChanges.pipe(
      tap(value => this.data.sidenavOpened.next(false)),
      tap(value => localStorage.setItem('light_theme', value ? 'yes' : 'no'))
    ).subscribe(light => {
      if (light) {
        document.body.setAttribute('theme', 'light');
      } else {
        document.body.setAttribute('theme', 'dark');
      }
    });
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

  close() {
    this.data.sidenavOpened.next(!this.data.sidenavOpened.getValue());
  }

}
