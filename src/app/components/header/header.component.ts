import { Component, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';
import { ConfigService } from '@services/config.service';
import { HeaderLink } from '@other/interfaces';
import { CognosService } from '@services/cognos.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewChecked {

  constructor(
    public loader: LoadingService,
    public data: DataService,
    public config: ConfigService,
    private changeDetector: ChangeDetectorRef,
    private _cognos: CognosService
  ) {
    this.loader.loading$.subscribe(bol => this.loading = bol);
    // Load available links for the header, only those will be visible
    const links = this._cognos.getLinksWithAccess({ ...this.config.config });
    this.reports.next(links);
    const lightThemeStorage = localStorage.getItem('light_theme');
    if (lightThemeStorage === 'yes') {
      this.data.lightTheme.setValue(true);
    }
  }

  loading = false;

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  openSidenav(): void {
    this.data.sidenavOpened.next(!this.data.sidenavOpened.getValue());
  }

  reports = new BehaviorSubject<HeaderLink[]>([]);

}
