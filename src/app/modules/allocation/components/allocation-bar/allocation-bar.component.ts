import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'allocation-bar',
  templateUrl: './allocation-bar.component.html',
  styleUrls: ['./allocation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllocationBarComponent {

  allocation = 0;
  program = 0;
  zero = false;

  @Input() partNumber: number;
  @Input() programNumber: number;

  @Input() ready: boolean;

  @Input('allocation') set allocationSetter(value: number) {
    this.allocation = value;
    this.zero = (isNaN(this.allocation) || this.allocation === 0) && this.program === 0;
  }

  @Input('program') set programSetter(value: number) {
    this.program = value;
    this.zero = (isNaN(this.allocation) || this.allocation === 0) && this.program === 0;
  }

}
