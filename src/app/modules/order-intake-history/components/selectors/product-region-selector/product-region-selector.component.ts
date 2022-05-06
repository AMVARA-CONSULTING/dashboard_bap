import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderIntakeHistoryRouter } from '@modules/order-intake-history/services/order-intake-history-router.service';
import { RegionOrProduct } from '@other/interfaces';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'dip-product-region-selector',
  templateUrl: './product-region-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRegionSelectorComponent {

  // FormControl for current Region / Product
  regionProductControl = new FormControl('');

  params$: Observable<any>;

  constructor(
    private _obRouter: OrderIntakeHistoryRouter,
    private _ac: ActivatedRoute
  ) {
    // Grab all params from URL
    this.params$ = this._ac.paramMap
    .pipe(
      map(params => params.keys.reduce((r, a) => (r[a] = params.get(a), r), {} as any))
    );
    this.params$.subscribe(params => this.regionProductControl.setValue( `${params.type}|${params.value}` ));
    // Subcribe to selector changes and grab latest params values
    this.regionProductControl.valueChanges.pipe(
      distinctUntilChanged(),
      map(value => ({ type: value.split('|')[0], value: value.split('|')[1] }))
    ).subscribe(selected => {
      // We are in LVL 4
      this._obRouter.goToProductRegionView(this._ac, null, null, null, selected.type as RegionOrProduct, selected.value);
    });
  }

  @Input() rows: any[];
  @Input() previousRows: any[];
}
