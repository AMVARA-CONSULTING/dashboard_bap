import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, query, style, group, animate } from '@angular/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'production-program-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  animations: [
    // Router transition between pages in OrderIntake
    // If you need to add more than 3 pages, simply add it with a comma
    // in every transition function
    trigger('routerTransition', [
      transition('1 => 2, 2 => 3', [
        query(':enter, :leave', style({ overflow: 'hidden' })
          , { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
          ], { optional: true }),
        ])
      ]),
      transition('2 => 1, 3 => 2, 3 => 1', [
        query(':enter, :leave', style({ overflow: 'hidden' })
          , { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ left: 0, transform: 'translateX(100%)' }))
          ], { optional: true }),
        ])
      ]),
    ])
  ],
  host: {
    '[@routerTransition]': 'getLevel()'
  }
})
export class WrapperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('o') outlet: RouterOutlet

  getLevel() {
    return this.outlet.activatedRouteData['level']
  }

}
