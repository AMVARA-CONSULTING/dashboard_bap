import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderIntakeMainComponent } from './components/order-intake-main/order-intake-main.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NumberPipe } from '@pipes/number.pipe';
import { GraphicComponent } from './components/graphic/graphic.component';
import { OrderIntakeSubLvl2Component } from './components/order-intake-sub-lvl2/order-intake-sub-lvl2.component';
import { OrderIntakeWrapperComponent } from './components/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: OrderIntakeWrapperComponent,
    children: [
      { path: '', component: OrderIntakeMainComponent },
      { path: 'zone/:id', component: OrderIntakeSubLvl2Component, data: { zone: true } },
      { path: 'plant/:id', component: OrderIntakeSubLvl2Component, data: { zone: false } }
    ]
  },
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
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
