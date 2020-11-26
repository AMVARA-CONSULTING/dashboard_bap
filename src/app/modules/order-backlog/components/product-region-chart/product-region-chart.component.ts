import { BehaviorSubject } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dip-product-region-chart',
  templateUrl: './product-region-chart.component.html',
  styleUrls: ['./product-region-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRegionChartComponent implements OnChanges {

  @Input() current !: number;
  @Input() previous: number = null;

  // Percents
  actualPercent = new BehaviorSubject<number>(0);
  deltaPercent = new BehaviorSubject<number>(0);
  previousPercent = new BehaviorSubject<number>(0);

  // Delta offset percent
  deltaPosition = new BehaviorSubject<number>(0);

  // Delta value
  deltaValue = new BehaviorSubject<number>(0);

  ngOnChanges(changes: SimpleChanges) {
    // Grab current values
    const current = changes.current.currentValue;
    const previous = (changes.previous && changes.previous.currentValue) || 0;
    if (!isNaN(current)) {
      // Check if previous is valid
      // If previous is not valid, only show total bar
      let highestValue = current;
      if (!isNaN(previous)) {
        // Calculate highest value
        highestValue = Math.max(current, previous);
      }
      const actualPercent = this.calculatePercent(highestValue, current);
      this.actualPercent.next(actualPercent);
      const previousPercent = this.calculatePercent(highestValue, previous);
      this.previousPercent.next(previousPercent);
      const difference = current - previous;
      this.deltaValue.next(difference);
      let deltaPercent;
      if (difference > 0) {
        deltaPercent = this.calculatePercent(highestValue, difference);
      } else {
        deltaPercent = this.calculatePercent(highestValue, previous - current);
      }
      this.deltaPercent.next(deltaPercent);
      if (difference > 0) {
        this.deltaPosition.next(previousPercent);
      } else {
        this.deltaPosition.next(actualPercent);
      }
    }
  }

  calculatePercent(total: number, part: number): number {
    return + ( ( part / total ) * 100).toFixed(0);
  }

}
