import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { LoadingService } from '@services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.lighter]': 'loading'
  }
})
export class FooterComponent {

  constructor(
    public config: ConfigService,
    public loader: LoadingService,
    private router: Router
  ) {
    this.loader.loading$.subscribe(bol => this.loading = bol);
  }

  loading = false;

  goHelp() {
    this.router.navigate(['help'], { queryParamsHandling: 'merge' });
  }

}
