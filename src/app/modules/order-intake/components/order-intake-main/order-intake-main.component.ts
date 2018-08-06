import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { ApiService } from '@services/api.service';
import { LoadingService } from '@services/loading.service';
import { ConfigService } from '@services/config.service';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'order-intake-main',
  templateUrl: './order-intake-main.component.html',
  styleUrls: ['./order-intake-main.component.scss'],
  animations: [
    trigger('overview', [
      state('false', style({
        opacity: 0
      })),
      state('true', style({
        opacity: 1
      })),
      transition('* <=> *', animate('1000ms ease-in-out', style({ opacity: 1 })))
    ]),
    trigger('list', [
      transition('* => *', [
        query('.zone:enter', style({ opacity: 0 }), { optional: true }),
        query('.zone:enter', stagger('200ms', animate('300ms ease-in', style({ opacity: 1 }))), { optional: true })
      ])
    ])
  ],
})
export class OrderIntakeMainComponent implements OnInit {

  constructor(
    public data: DataService,
    private api: ApiService,
    private loader: LoadingService,
    private config: ConfigService,
    private router: Router
  ) { }

  ready: boolean = false

  ngOnInit() {
    this.loader.Show()
    // If no Order Intake rows were found, get them
    if (this.data.orderIntakeData.length == 0) {
      this.api.getOrderIntakeData().subscribe(data => {
        this.data.orderIntakeData = data
        this.data.orderIntakeData.forEach((row, index, rows) => {
          rows[index][12] = isNaN(rows[index][12]) ? 0 : parseFloat(rows[index][12])
          rows[index][13] = isNaN(rows[index][13]) ? 0 : parseFloat(rows[index][13])
        })
        this.rollupData()
        this.loader.Hide()
      })
    } else {
      this.rollupData()
      this.loader.Hide()
    }
  }

  rollupData() : void {
    this.rowGroups = this.data.classifyByIndex(this.data.orderIntakeData, 0)
    this.rowPlants = this.data.classifyByIndex(this.data.orderIntakeData, 1)
    this.rowKeys = Object.keys(this.rowGroups)
    setTimeout(() => this.ready = true)
  }

  getPlantsByZone(ZoneID) {
    return Object.keys(this.rowGroups[ZoneID].reduce((r,a) => {
      r[a[1]] = r[a[1]] || []
      r[a[1]].push(a)
      return r
    }, {}))
  }

  goZone(ZoneID): void {
    this.router.navigate(['order-intake','zone', ZoneID])
  }

  goPlant(PlantID): void {
    this.router.navigate(['order-intake', 'plant', PlantID])
  }

  rowGroups: any
  rowKeys: any
  rowPlants: any

}
