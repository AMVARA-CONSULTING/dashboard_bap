import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderIntakeMainComponent } from './components/order-intake-main/order-intake-main.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NumberPipe } from '@pipes/number.pipe';
import { GraphicComponent } from './components/graphic/graphic.component';
import { OrderIntakeSubLvl2Component } from './components/order-intake-sub-lvl2/order-intake-sub-lvl2.component';
import { OrderIntakeWrapperComponent } from './components/wrapper/wrapper.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { OrderIntakeSubLvl3Component } from './components/order-intake-sub-lvl3/order-intake-sub-lvl3.component';
import { DipCircularMetersComponent } from '@components/circular-meters/circular-meters.component';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';

const sub3: Routes = [
  {
    path: 'region/:region_id',
    component: OrderIntakeSubLvl3Component,
    data: {
      region: true,
      level: 3
    }
  },
  {
    path: 'product/:product_id',
    component: OrderIntakeSubLvl3Component,
    data: {
      region: false,
      level: 3
    }
  }
]

const routes: Routes = [
  {
    path: '',
    component: OrderIntakeWrapperComponent,
    children: [
      {
        path: '',
        component: OrderIntakeMainComponent,
        data: { level: 1 }
      },
      {
        path: ':type/:id',
        component: OrderIntakeSubLvl2Component,
        data: { level: 2 },
      },
      {
        path: ':type/:id/:type2/:region_id',
        component: OrderIntakeSubLvl3Component,
        data: { level: 3 }
      }
    ]
  },
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatTooltipModule,
    RoundProgressModule
  ],
  declarations: [
    NumberPipe,
    OrderIntakeMainComponent,
    GraphicComponent,
    OrderIntakeSubLvl2Component,
    OrderIntakeWrapperComponent,
    OrderIntakeSubLvl3Component,
    // DIP Own Components
    DipCircularMetersComponent
  ],
  exports: [
    DipCircularMetersComponent
  ]
})
export class OrderIntakeModule { }