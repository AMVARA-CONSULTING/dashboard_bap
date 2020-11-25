import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderBacklogRouter } from '@modules/order-backlog/services/order-backlog-router.service';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Zones } from '@other/interfaces';
import { OrderBacklogState } from '@store/order-backlog.state';
import { distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'dip-plant-selector',
  templateUrl: './plant-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantSelectorComponent {

  // Retrieve unique zones from Order Backlog State
  @ViewSelectSnapshot(OrderBacklogState.GetUniqueZones) zones$ !: Zones;

  // FormControl for current Plant / Zone
  plantControl = new FormControl('');

  params$: Observable<any>;

  constructor(
    private _obRouter: OrderBacklogRouter,
    private _ac: ActivatedRoute
  ) {
    // Grab all params from URL
    this.params$ = this._ac.paramMap
    .pipe(
      map(params => params.keys.reduce((r, a) => (r[a] = params.get(a), r), {} as any))
    );
    this.params$.subscribe(params => this.plantControl.setValue( `${params.plant}|${params.id}` ));
    // Subcribe to selector changes and grab latest params values
    this.plantControl.valueChanges.pipe(
      distinctUntilChanged(),
      map(value => ({ type: value.split('|')[0], value: value.split('|')[1] })),
      withLatestFrom(this.params$)
    ).subscribe(([selected, params]) => {
      // Detect in which level we are
      if (params.hasOwnProperty('type')) {
        // We are in LVL 4
        this._obRouter.goToProductRegionView(this._ac, selected.type, selected.value, null, null, null);
      } else if (params.hasOwnProperty('month')) {
        // We are in LVL 3
        this._obRouter.goToMonthView(this._ac, selected.type, selected.value, null);
      } else {
        // We are in LVL 3
        this._obRouter.goToPlantZoneView(this._ac, selected.type, selected.value);
      }
    });
  }

}
