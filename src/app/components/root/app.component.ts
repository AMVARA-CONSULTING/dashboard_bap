import { NewUpdateComponent } from './../../dialogs/new-update/new-update.component';
import { MatDialog } from '@angular/material/dialog';
import { Config } from './../../other/interfaces';
import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HeaderLink } from '@other/interfaces';
import { CognosService } from '@services/cognos.service';
import { BehaviorSubject, interval, timer } from 'rxjs';
import { retry, tap, map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { versionToNumber } from '@other/functions';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { ConfigState } from '@store/config.state';

@Component({
  selector: 'dip-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  reports = new BehaviorSubject<HeaderLink[]>([]);

  // Log current NGXS State when pressing Alt + F11, everywhere
  @HostListener('document:keydown.Alt.F11')
  showState() {
    if (this._cognos.userCapabilities.getValue().admin) {
      console.log(this._store.snapshot());
    }
  }

  @SelectSnapshot(ConfigState) config !: Config;

  constructor(
    public data: DataService,
    private translate: TranslateService,
    private _location: LocationStrategy,
    private router: Router,
    private api: ApiService,
    private http: HttpClient,
    private _cognos: CognosService,
    private _store: Store,
    private _dialog: MatDialog
  ) {
    if (this.config.simulateUnauthorized > 0) {
      timer(this.config.simulateUnauthorized).subscribe(_ => this.api.authorized = false);
    }
    if (this.api.corpintra || location.hostname !== 'localhost') {
      // Heartbeat and check updates
      const pathname = location.pathname.substring(0, location.pathname.lastIndexOf('/')) + '/';
      this.api.heartbeat = interval(this.config.heartbeat).subscribe(_ => {
        // Request to common config instead of keep.alive.txt
        // Therefore we can maintain session alive and check newer versions at the same time
        this.http.get<Config>(pathname + `assets/config_common.json`, {
          observe: 'response',
          params: {
            'ngsw-bypass': '1', // Bypass Service Worker Cache
            'cache-bust': (new Date()).getTime().toString() // Cache busting parameter
          }
        }).pipe(
          // Retry request up to 3 times
          retry(3),
        ).subscribe(res => {
          // Parse text to JSON and compare version with current config
          const currentVersion = versionToNumber(this.config.version);
          const newerVersion = versionToNumber(res.body.version);
          if (newerVersion > currentVersion) {
            // New version detected
            this._dialog.open(NewUpdateComponent, {
              disableClose: true,
              panelClass: 'newUpdate'
            });
          }
        });
        }
      );
    }
    this._location.onPopState(() => {
      if (this.data.currentLevel === 1 && this.data.title !== 'order_intake') {
        this.router.navigate(['order-intake'], { replaceUrl: true, queryParamsHandling: 'merge' });
      }
    });
    data.init();
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') || this.config.language);
    // If going to a report, check it has access, and if not, redirect to another one with access
    const links = this._cognos.getLinksWithAccess();
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
      tap(_ => this.data.sidenavOpened.next(false)),
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
