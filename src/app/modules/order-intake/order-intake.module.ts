import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderIntakeMainComponent } from './components/order-intake-main/order-intake-main.component';
import { Routes, RouterModule } from '@angular/router';
import { GraphicComponent } from './components/graphic/graphic.component';
import { OrderIntakeSubLvl2Component } from './components/order-intake-sub-lvl2/order-intake-sub-lvl2.component';
import { OrderIntakeWrapperComponent } from './components/wrapper/wrapper.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrderIntakeSubLvl3Component } from './components/order-intake-sub-lvl3/order-intake-sub-lvl3.component';
import { SharedModule } from '@modules/shared/shared.module';

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
        data: { level: 2 }
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
    MatTooltipModule,
    SharedModule
  ],
  declarations: [
    OrderIntakeMainComponent,
    GraphicComponent,
    OrderIntakeSubLvl2Component,
    OrderIntakeWrapperComponent,
    OrderIntakeSubLvl3Component
  ]
})
export class OrderIntakeModule { }
