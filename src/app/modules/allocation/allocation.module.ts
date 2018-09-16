import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllocationMainComponent } from './components/allocation-main/allocation-main.component';
import { SharedModule } from '@modules/shared/shared.module';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { Routes, RouterModule } from '@angular/router';
import { AllocationLvl2Component } from './components/allocation-lvl2/allocation-lvl2.component';
import { GraphicComponent } from './components/graphic/graphic.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AllocationMainComponent,
        data: { level: 1 }
      },
      {
        path: ':plant',
        component: AllocationMainComponent,
        data: { level: 1 }
      },
      {
        path: ':plant/year/:year/month/:month',
        component: AllocationLvl2Component,
        data: { level: 2 }
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    AllocationMainComponent,
    WrapperComponent,
    AllocationLvl2Component,
    GraphicComponent
  ]
})
export class AllocationModule { }
