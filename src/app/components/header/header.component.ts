import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';
import { Router } from '@angular/router';
import { ToolsService } from '@services/tools.service';
import { ConfigService } from '@services/config.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public loader: LoadingService,
    public data: DataService,
    private router: Router,
    private tools: ToolsService,
    public config: ConfigService
  ) {
    
  }

  ngOnInit() {
  }

  openSidenav(): void {
    this.data.sidenavOpened = !this.data.sidenavOpened
  }

  go(link) {
    this.router.navigate([link], { replaceUrl: true})
  }

}
