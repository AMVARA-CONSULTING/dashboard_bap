import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';
import { ConfigService } from '@services/config.service';
import { HeaderLink } from '@other/interfaces';
import { CognosService } from '@services/cognos.service';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/internal/operators/tap';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  constructor(
    public loader: LoadingService,
    public data: DataService,
    public config: ConfigService,
    private changeDetector: ChangeDetectorRef,
    private _cognos: CognosService
  ) {
    this.loader.loading$.subscribe(bol => this.loading = bol)
    // Load available links for the header, only those will be visible
    const links = this._cognos.getLinksWithAccess(Object.assign({}, this.config.config))
    this.reports.next(links)
    const lightThemeStorage = localStorage.getItem('light_theme')
    if (lightThemeStorage === 'yes') {
      this.lightTheme.setValue(true)
    }
  }

  lightTheme = new FormControl(false)

  loading: boolean = false

  ngOnInit() {
    this.lightTheme.valueChanges.pipe(
      tap(value => localStorage.setItem('light_theme', value ? 'yes' : 'no'))
    ).subscribe(light => {
      if (light) {
        document.body.setAttribute('theme', 'light')
      } else {
        document.body.setAttribute('theme', 'dark')
      }
    })
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges()
  }

  openSidenav(): void {
    this.data.sidenavOpened = !this.data.sidenavOpened
  }

  reports = new BehaviorSubject<HeaderLink[]>([])

}