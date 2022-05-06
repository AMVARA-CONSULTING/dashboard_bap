import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderIntakeHistoryRouter } from '@modules/order-intake-history/services/order-intake-history-router.service';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'dip-month-selector',
  templateUrl: './month-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthSelectorComponent {

  // FormControl for current month
  monthControl = new FormControl('');

  params$: Observable<any>;

  @Input() rows: any[];

  constructor(
    private _obRouter: OrderIntakeHistoryRouter,
    private _ac: ActivatedRoute
  ) {
    // Grab all params from URL
    this.params$ = this._ac.paramMap
    .pipe(
      map(params => params.keys.reduce((r, a) => (r[a] = params.get(a), r), {} as any))
    );
    this.params$.subscribe(params => this.monthControl.setValue( params.month ));
    // Subcribe to selector changes and grab latest params values
    this.monthControl.valueChanges.pipe(
      distinctUntilChanged(),
      withLatestFrom(this.params$)
    ).subscribe(([month, params]: [string, any]) => {
      // Detect in which level we are
      if (params.hasOwnProperty('type')) {
        // We are in LVL 4
        this._obRouter.goToProductRegionView(this._ac, null, null, month, null, null);
      } else {
        // We are in LVL 3
        this._obRouter.goToMonthView(this._ac, null, null, month);
      }
    });
  }

}
