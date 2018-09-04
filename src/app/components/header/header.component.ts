import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';
import { Router } from '@angular/router';
import { ToolsService } from '@services/tools.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private loading: LoadingService,
    public data: DataService,
    private router: Router,
    private tools: ToolsService
  ) { }

  ngOnInit() {
  }

  openSidenav() : void {
    this.data.sidenavOpened = !this.data.sidenavOpened
  }

}
