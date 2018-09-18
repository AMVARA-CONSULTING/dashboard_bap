import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    public config: ConfigService,
    private translate: TranslateService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    console.log(this.config.config.language)
  }

  setLang(code: string) : void {
    localStorage.setItem('lang', code)
    this.translate.use(code)
    this.snack.open('Language changed successfully!', 'OK', { duration: 3000 });
  }

  reloadLang() : void {
    this.translate.reloadLang(this.config.config.language)
    this.snack.open('Language reloaded successfully!', 'OK', { duration: 3000 });
  }

  showConfig: boolean = false

}
