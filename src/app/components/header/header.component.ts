import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';
import { ConfigService } from '@services/config.service';
import { HeaderLink } from '@other/interfaces';
import { CognosService } from '@services/cognos.service';
import { ConfigState } from '@store/config.state';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  loading$ !: Observable<boolean>;

  constructor(
    public data: DataService,
    public config: ConfigService,
    private _cognos: CognosService,
    private _store: Store
  ) {
    // Load available links for the header, only those will be visible
    const links = this._cognos.getLinksWithAccess();
    this.reports = links;
    const lightThemeStorage = localStorage.getItem('light_theme');
    if (lightThemeStorage === 'yes') {
      this.data.lightTheme.setValue(true);
    }
    this.loading$ = this._store.select(ConfigState.GetLoading).pipe( delay(0) );
  }

  openSidenav(): void {
    this.data.sidenavOpened.next(!this.data.sidenavOpened.getValue());
  }

  reports: HeaderLink[] = [];

}
