import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from '@services/loading.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

  constructor(public loader: LoadingService) {
    this.loader.loading$.subscribe(bol => this.loading = bol);
  }

  loading = false;

}
