import { trigger, transition, query, style, group, animate } from '@angular/animations';

export const swipeAnimation =  trigger('routerTransition', [
    transition(':increment', [
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
    transition(':decrement', [
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