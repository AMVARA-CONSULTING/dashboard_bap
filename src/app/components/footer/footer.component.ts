import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  host: {
    '[class.lighter]': 'loader.show'
  }
})
export class FooterComponent implements OnInit {

  constructor(
    public config: ConfigService,
    public loader: LoadingService,
    public data: DataService
  ) { }

  ngOnInit() {
  }

}
