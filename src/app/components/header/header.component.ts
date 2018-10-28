import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';
import { Router } from '@angular/router';
import { ToolsService } from '@services/tools.service';
import { ConfigService } from '@services/config.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  constructor(
    public loader: LoadingService,
    public data: DataService,
    private router: Router,
    private tools: ToolsService,
    public config: ConfigService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.loader.loading$.subscribe(bol => this.loading = bol)
  }

  loading: boolean = false

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges()
  }

  openSidenav(): void {
    this.data.sidenavOpened = !this.data.sidenavOpened
  }

}
