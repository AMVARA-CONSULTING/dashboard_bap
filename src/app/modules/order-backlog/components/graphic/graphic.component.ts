import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { trigger, transition, query, stagger, style, animate } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'order-backlog-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('list', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('200ms', animate('300ms ease-in', style({ opacity: 1 }))), { optional: true })
      ])
    ])
  ]
})
export class OrderBacklogGraphicComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  @Input() zones: KeyValue<string, any[]>[];

  // CLick handler for going to clicked zone
  goZone(ZoneID): void {
    this.router.navigate(['zone', ZoneID], { relativeTo: this.route, replaceUrl: true });
  }

}
