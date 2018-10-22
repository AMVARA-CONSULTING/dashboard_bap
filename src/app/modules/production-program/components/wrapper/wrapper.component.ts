import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, query, style, group, animate } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { DataService } from '@services/data.service';
import { swipeAnimation } from 'app/app.transitions';

@Component({
  selector: 'production-program-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  animations: [swipeAnimation],
  host: {
    '[@routerTransition]': 'getLevel()'
  }
})
export class WrapperComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  @ViewChild('o') outlet: RouterOutlet

  getLevel() {
    this.data.currentLevel = +this.outlet.activatedRouteData['level']
    return this.outlet.activatedRouteData['level']
  }

}
