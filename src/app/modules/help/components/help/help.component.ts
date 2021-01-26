import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContactInfo } from '@other/interfaces';
import { ConfigService } from '@services/config.service';
import { DataService } from '@services/data.service';

@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  host: {
    '(swiperight)': 'data.goFrom("help", $event)',
    '(swipeleft)': 'data.goFrom("help", $event)'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpComponent {

  constructor(
    public config: ConfigService,
    public data: DataService,
    private translate: TranslateService
  ) {
    data.currentLevel = 1;
    this.contacts = config.config.contacts[this.config.config.target];
  }

  ngOnInit() {
    var regex = /@/g;
    var toTranslate = this.translate.instant('help.link_to_app');
    this.AppLink = toTranslate.replace(regex, this.config.config.appTitle);
  }
  contacts: ContactInfo[] = [];
  AppLink: string;

}
