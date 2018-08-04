import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'order-intake-main',
  templateUrl: './order-intake-main.component.html',
  styleUrls: ['./order-intake-main.component.css']
})
export class OrderIntakeMainComponent implements OnInit {

  constructor(private data: DataService, private api: ApiService) { }

  ngOnInit() {
    this.api.getOrderIntakeData().subscribe(data => {
      this.data.orderIntakeData = data
      console.log(this.data.classifyByIndex(data, 1))
    })
  }

}
