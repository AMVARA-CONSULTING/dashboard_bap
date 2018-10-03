import { Component, OnInit } from '@angular/core';
import { ContactInfo } from '@other/interfaces';
import { ConfigService } from '@services/config.service';
import { DataService } from '@services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  host: {
    '(swiperight)': 'data.go("about")',
    '(swipeleft)': 'data.go("order-intake")'
  }
})
export class HelpComponent implements OnInit {

  constructor(
    public config: ConfigService,
    public data: DataService
  ) {
    data.currentLevel = 1
    this.contacts = config.config.contacts
  }

  ngOnInit() {
  }

  contacts: ContactInfo[] = []

}
