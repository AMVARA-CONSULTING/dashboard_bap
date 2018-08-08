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

const routes: Routes = [
  {
    path: '',
    component: OrderIntakeWrapperComponent,
    children: [
      { path: '', component: OrderIntakeMainComponent, data: { level: 1 } },
      { path: 'zone/:id', component: OrderIntakeSubLvl2Component, data: { zone: true, level: 2 } },
      { path: 'plant/:id', component: OrderIntakeSubLvl2Component, data: { zone: false, level: 2 } }
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
    OrderIntakeWrapperComponent
  ]
})
export class OrderIntakeModule { }
