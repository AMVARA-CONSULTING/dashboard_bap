import { Component, OnInit } from '@angular/core';
import { ContactInfo } from '@other/interfaces';
import { ConfigService } from '@services/config.service';

@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(
    public config: ConfigService
  ) {
    this.contacts = config.config.contacts
  }

  ngOnInit() {
  }

  contacts: ContactInfo[] = []

}
