import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private loading: LoadingService,
    public data: DataService
  ) { }

  ngOnInit() {
  }

  openSidenav() : void {
    this.data.sidenavOpened = !this.data.sidenavOpened
  }

}
