import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@services/loading.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(public loader: LoadingService) { }

  ngOnInit() {
  }

}