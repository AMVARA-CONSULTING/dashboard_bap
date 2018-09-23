import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '@services/config.service';
import { PlatformLocation, LocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { MatDialog } from '@angular/material';
import { NewUpdateComponent } from '../../dialogs/new-update/new-update.component';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'dip-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public data: DataService,
    private translate: TranslateService,
    private config: ConfigService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private sw: SwUpdate
  ) {
    data.init()
    translate.setDefaultLang('en')
    translate.use(localStorage.getItem('lang') || config.config.language)
  }

  ngOnInit() {
    if (this.sw.isEnabled) {
      this.sw.available.subscribe(() => {
        console.log("%cNew version detected!", "color:green;")
        let dialogRef = this.dialog.open(NewUpdateComponent, {
          disableClose: true,
          panelClass: 'newUpdate'
        })
        dialogRef.afterClosed().subscribe(confirm => {
          if (confirm) {
            window.location.reload()
          }
        })
      })
    }
  }

  preventUpdate: boolean = false

  close() {
    this.data.sidenavOpened = !this.data.sidenavOpened
  }

  go(link) {
    this.router.navigate([link], { replaceUrl: true})
  }
  
}
