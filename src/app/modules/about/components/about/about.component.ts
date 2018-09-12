import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@services/config.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    public config: ConfigService
  ) { }

  ngOnInit() {
  }

}
