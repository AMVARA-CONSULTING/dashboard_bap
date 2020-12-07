import { MaxPipe } from './pipes/max.pipe';
import { DefaultPipe } from './pipes/default.pipe';
import { AbsPipe } from './pipes/abs.pipe';
import { ProductRegionChartComponent } from './components/product-region-chart/product-region-chart.component';
import { ProductRegionLabelFormatPipe } from './pipes/product-region-label-format.pipe';
import { MonthSelectorComponent } from './components/selectors/month-selector/month-selector.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
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
import { OrderBacklogSubLvl4Component } from './components/order-backlog-sub-lvl4/order-backlog-sub-lvl4.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { DistinctItemsPipe } from './pipes/distinct-items.pipe';
import { OrderBacklogRouter } from './services/order-backlog-router.service';
import { OrderBacklogHeaderComponent } from './components/order-backlog-header/order-backlog-header.component';
import { FormatLatestDayPipe } from './pipes/format-latest-day.pipe';
import { FilterDayPipe } from './pipes/filter-day.pipe';
import { PlantSelectorComponent } from './components/selectors/plant-selector/plant-selector.component';
import { ProductRegionSelectorComponent } from './components/selectors/product-region-selector/product-region-selector.component';
import { JoinArraysPipe } from './pipes/join-arrays.pipe';
import { MockMissingPreviousRowsPipe } from './pipes/mock-missing-previous-rows.pipe';

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
        path: ':plant/:id',
        component: OrderBacklogSubLvl2Component,
        data: { level: 2 }
      },
      {
        path: ':plant/:id/month/:month',
        component: OrderBacklogSubLvl3Component,
        data: { level: 3 }
      },
      {
        path: ':plant/:id/month/:month/:type/:value',
        component: OrderBacklogSubLvl4Component,
        data: { level: 4 }
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    NgxChartsModule,
    SharedModule
  ],
  declarations: [
    // Components
    OrderBacklogWrapperComponent,
    OrderBacklogMainComponent,
    OrderBacklogGraphicComponent,
    OrderBacklogSubLvl2Component,
    OrderBacklogSubLvl3Component,
    OrderBacklogSubLvl4Component,
    OrderBacklogGraphicComparisonComponent,
    OrderBacklogHeaderComponent,
    ProductRegionChartComponent,
    // Selectors
    PlantSelectorComponent,
    MonthSelectorComponent,
    ProductRegionSelectorComponent,
    // Pipes
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
    DistinctItemsPipe,
    ReversePipe,
    FormatLatestDayPipe,
    FilterDayPipe,
    ProductRegionLabelFormatPipe,
    AbsPipe,
    DefaultPipe,
    MaxPipe,
    JoinArraysPipe,
    MockMissingPreviousRowsPipe
  ],
  providers: [
    OrderBacklogRouter
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
