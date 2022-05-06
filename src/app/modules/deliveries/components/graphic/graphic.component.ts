import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'shipped-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphicComponent implements OnChanges {

  constructor(private ref: ChangeDetectorRef, private translate: TranslateService) {
    (window as any).oi_graphic = this;
  }

  @Input() data: any;
  chartData: any = [];
  barsWidth: number = 0

  // this is a variable binded to [ngClass], if it is false bar's height goes down to zero.  Is used to force height transition animation
  ready: boolean = false

  ngOnChanges(changes: SimpleChanges): void {
    // return if currentData detected by changeDetection is the same as previousData
    if ( JSON.stringify(changes.data.currentValue) == JSON.stringify(changes.data.previousValue) ) return;

    // force bars' height to go down to 0, in order to trigger animation again when user changes day, plant or month
    this.ready = false;

    this.chartData = this.formatData(changes.data.currentValue);

    // define percentual width for each bar group. A bar group contains 2 bars, one simulates selected 'day' data  and another 'monthly average' data
    this.barsWidth = 100 / this.chartData.length

    setTimeout(() =>  {
      // allow bar to take percentual height, will trigger height transition animation from zero to x%
      this.ready = true;

      // force change detection
      this.ref.detectChanges();
    }, 300);
  }


  formatData(data) {
    let formattedData = [];
    const to = {name: this.translate.instant('shipped.to'), day: data.day.to, average: data.month["DS to"]};
    const tot = {name: this.translate.instant('shipped.tr'), day: data.day["tot"], average: data.month["DS tot"]};
    const ow = {name: this.translate.instant('shipped.ow'), day: data.day["ow"], average: data.month["DS ow"]};
    const rs = {name: this.translate.instant('shipped.rs'), day: data.day["rs"], average: data.month["DS rs"]};
    const cc = {name: this.translate.instant('shipped.cc'), day: data.day["cc"], average: data.month["DS cc"]};


    formattedData.push(to, tot, ow, rs, cc);
    formattedData = this.calculatePercentualHeight(formattedData);

    return formattedData;
  }

  calculatePercentualHeight(chartData) {
    /* each item in diagramData array inicially comes in format {name: 'Total', day: 219, average: 451}
     this function calculates highest numerical value in whole array, which is used as reference to calculated percentual height for each bar
     so the height of all the displayed bars are percentually relevant to the highest bar

     in the above shown item example highest numerical value would be 451.

     so in chart the bar that displays 'average' property's value for this item will be the highest, which will go up to the top of the chart container (it would be 100% height)
     but the day bar's height would be calculated having in mind that its height must be percentually relevant the highest bar, so the formula would be
     ( 219 / 451 ) * 100  = 48,5  so the day bar's height will be 48,5% of highest bar's height

     the same logic is applied independently of cuantity of items in array
    */

    let max = 0;

    // get highest bar's value
    chartData.forEach(el => {
      if(el.day > max ) max = el.day
      if(el.average > max ) max = el.average;
    });

    // generate percentual height for each item, using the highest bar as reference
    chartData.forEach(el => {
      el.dayPercent = (el.day / max) * 100;
      el.averagePercent = (el.average / max) * 100;
    });
    return chartData;
  }

}