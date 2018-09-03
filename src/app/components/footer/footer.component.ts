import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@services/config.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public config: ConfigService
  ) { }

  ngOnInit() {
  }

}
