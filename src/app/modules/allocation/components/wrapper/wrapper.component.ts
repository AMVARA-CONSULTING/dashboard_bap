import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '@services/data.service';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, query, style, group, animate } from '@angular/animations';
import { swipeAnimation } from 'app/app.transitions';

@Component({
  selector: 'allocation-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  animations: [swipeAnimation],
  host: {
    '[@routerTransition]': 'getLevel()'
  }
})
export class WrapperComponent implements OnInit {

  constructor(private data: DataService) {
    data.lastTap, data.lastTap2 = null
  }

  ngOnInit() {
  }

  @ViewChild('o') outlet: RouterOutlet

  getLevel() {
    this.data.currentLevel = +this.outlet.activatedRouteData['level']
    return this.outlet.activatedRouteData['level']
  }

}
