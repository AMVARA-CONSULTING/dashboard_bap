import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '@modules/shared/shared.module';
import { OrderBacklogWrapperComponent } from './components/wrapper/wrapper.component';
import { OrderBacklogMainComponent } from './components/order-backlog-main/order-backlog-main.component';
import { GroupOrPlantNamePipe } from './pipes/group-or-plant-name.pipe';
import { FilterYearPipe } from './pipes/filter-year.pipe';
import { SumQuantityPipe } from './pipes/sum-quantity.pipe';
import { PlantsByZonePipe } from './pipes/plants-by-zone.pipe';
import { LetDirective } from './directives/ng-let.directive';
import { OrderBacklogGraphicComponent } from './components/graphic/graphic.component';
import { PercentPipe } from './pipes/percent.pipe';
import { HighestZoneTotalPipe } from './pipes/highest-zone-total.pipe';
import { DifferencePipe } from './pipes/difference.pipe';
import { StartWithPipe } from './pipes/start-with.pipe';
import { Store } from '@ngxs/store';
import { OrderBacklog } from '@store/order-backlog.state';
import { LayoutModule } from '@angular/cdk/layout';
import { OrderBacklogSubLvl2Component } from './components/order-backlog-sub-lvl2/order-backlog-sub-lvl2.component';
import { DistinctMonthsPipe } from './pipes/distinct-months.pipe';
import { MonthFormatPipe } from './pipes/month-format.pipe';
import { DistinctYearsPipe } from './pipes/distinct-years.pipe';
import { PreviousMonthPipe } from './pipes/previous-month.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OrderBacklogGraphicComparisonComponent } from './components/graphic-comparison/graphic-comparison.component';
import { OrderBacklogSubLvl3Component } from './components/order-backlog-sub-lvl3/order-backlog-sub-lvl3.component';
import { DistinctRegionsPipe } from './pipes/distinct-regions.pipe';
import { DistinctProductsPipe } from './pipes/distinct-products.pipe';

const routes: Routes = [
  {
    path: '',
    component: OrderBacklogWrapperComponent,
    children: [
      {
        path: '',
        component: OrderBacklogMainComponent,
        data: { level: 1 }
      },
      {
        path: ':type/:id',
        component: OrderBacklogSubLvl2Component,
        data: { level: 2 }
      },
      {
        path: ':type/:id/month/:month',
        component: OrderBacklogSubLvl3Component,
        data: { level: 3 }
      },
      /*{
        path: ':type/:id/:type2/:region_id',
        component: OrderIntakeSubLvl3Component,
        data: { level: 3 }
      } */
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTooltipModule,
    LayoutModule,
    NgxChartsModule,
    SharedModule
  ],
  declarations: [
    OrderBacklogWrapperComponent,
    OrderBacklogMainComponent,
    OrderBacklogGraphicComponent,
    OrderBacklogSubLvl2Component,
    OrderBacklogSubLvl3Component,
    OrderBacklogGraphicComparisonComponent,
    GroupOrPlantNamePipe,
    FilterYearPipe,
    SumQuantityPipe,
    PlantsByZonePipe,
    LetDirective,
    PercentPipe,
    HighestZoneTotalPipe,
    DifferencePipe,
    StartWithPipe,
    DistinctMonthsPipe,
    MonthFormatPipe,
    DistinctYearsPipe,
    PreviousMonthPipe,
    DistinctRegionsPipe,
    DistinctProductsPipe
  ]
})
export class OrderBacklogModule {

  constructor(
    private _store: Store
  ) {
    // Get Order Backlog Data
    this._store.dispatch( new OrderBacklog.Get() );
  }
}
