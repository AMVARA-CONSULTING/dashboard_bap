import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { Router } from '@angular/router';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { ConfigState } from '@store/config.state';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.lighter]': 'loading$'
  }
})
export class FooterComponent {

  @ViewSelectSnapshot(ConfigState.GetLoading) loading$ !: boolean;

  constructor(
    public config: ConfigService,
    private router: Router
  ) { }

  goHelp() {
    this.router.navigate(['help'], { queryParamsHandling: 'merge' });
  }

}
