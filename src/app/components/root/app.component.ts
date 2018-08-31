import { Component } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'dip-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public data: DataService) {}

  close() {
    this.data.sidenavOpened = !this.data.sidenavOpened
  }
  
}
