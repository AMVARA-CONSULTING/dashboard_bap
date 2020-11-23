import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';
import { ConfigService } from '@services/config.service';
import { HeaderLink } from '@other/interfaces';
import { CognosService } from '@services/cognos.service';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { ConfigState } from '@store/config.state';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @ViewSelectSnapshot(ConfigState.GetLoading) loading$ !: boolean;

  constructor(
    public data: DataService,
    public config: ConfigService,
    private _cognos: CognosService
  ) {
    // Load available links for the header, only those will be visible
    const links = this._cognos.getLinksWithAccess();
    this.reports = links;
    const lightThemeStorage = localStorage.getItem('light_theme');
    if (lightThemeStorage === 'yes') {
      this.data.lightTheme.setValue(true);
    }
  }

  openSidenav(): void {
    this.data.sidenavOpened.next(!this.data.sidenavOpened.getValue());
  }

  reports: HeaderLink[] = [];

}
