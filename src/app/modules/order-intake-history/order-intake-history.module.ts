import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportResourcesModule } from '@modules/report-resources/report-resources.module';
import { ReportWrapperComponent } from '@modules/report-resources/components/wrapper/wrapper.component';
import { OrderIntakeHistoryRouter } from './services/order-intake-history-router.service';
import { OrderIntakeHistoryMainComponent } from './components/order-intake-history-main/order-intake-history-main.component';
import { OrderIntakeHistorySubLvl2Component } from './components/order-intake-history-sub-lvl2/order-intake-history-sub-lvl2.component';
import { PlantSelectorComponent } from './components/selectors/plant-selector/plant-selector.component';
import { MonthSelectorComponent } from './components/selectors/month-selector/month-selector.component';
import { ProductRegionSelectorComponent } from './components/selectors/product-region-selector/product-region-selector.component';
import { OrderIntakeHistorySubLvl3Component } from './components/order-intake-history-sub-lvl3/order-intake-history-sub-lvl3.component';
import { OrderIntakeHistorySubLvl4Component } from './components/order-intake-history-sub-lvl4/order-intake-history-sub-lvl4.component';
import { TotalSelectorComponent } from './components/selectors/total-selector/total-selector.component';

const routes: Routes = [
  {
    path: '',
    component: ReportWrapperComponent,
    children: [
      {
        path: '',
        component: OrderIntakeHistoryMainComponent,
        data: { level: 1 }
      },
      {
        path: ':plant/:id',
        component: OrderIntakeHistorySubLvl2Component,
        data: { level: 2 }
      },
      {
        path: ':plant/:id/month/:month',
        component: OrderIntakeHistorySubLvl3Component,
        data: { level: 3 }
      },
      {
        path: ':plant/:id/month/:month/:type/:value',
        component: OrderIntakeHistorySubLvl4Component,
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
    SharedModule,
    ReportResourcesModule
  ],
  declarations: [
    // Components
    OrderIntakeHistoryMainComponent,
    OrderIntakeHistorySubLvl2Component,
    OrderIntakeHistorySubLvl3Component,
    OrderIntakeHistorySubLvl4Component,
    // Selectors
    PlantSelectorComponent,
    MonthSelectorComponent,
    ProductRegionSelectorComponent,
    TotalSelectorComponent
  ],
  providers: [
    OrderIntakeHistoryRouter
  ]
})
export class OrderIntakeHistoryModule {}
