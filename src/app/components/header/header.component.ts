import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { DataService } from '@services/data.service';
import { Router } from '@angular/router';
import { ToolsService } from '@services/tools.service';
import { ConfigService } from '@services/config.service';
import { BehaviorSubject } from 'rxjs';
import { HeaderLink } from '@other/interfaces';
import { CognosService } from '@services/cognos.service';

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
    public config: ConfigService,
    private changeDetector: ChangeDetectorRef,
    private _cognos: CognosService
  ) {
    this.loader.loading$.subscribe(bol => this.loading = bol)
    // Load available links for the header, only those will be visible
    const links = this._cognos.getLinksWithAccess(Object.assign({}, this.config.config))
    this.reports.next(links)
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

  reports = new BehaviorSubject<HeaderLink[]>([])

}