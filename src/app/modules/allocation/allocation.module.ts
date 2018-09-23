import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllocationMainComponent } from './components/allocation-main/allocation-main.component';
import { SharedModule } from '@modules/shared/shared.module';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { Routes, RouterModule } from '@angular/router';
import { AllocationLvl2Component } from './components/allocation-lvl2/allocation-lvl2.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { AllocationLvl3Component } from '@modules/allocation/components/allocation-lvl3/allocation-lvl3.component';
import { AllocationBarComponent } from './components/allocation-bar/allocation-bar.component';
import { NavigationGuard } from '../../guards/navigation-guard.service';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        component: AllocationMainComponent,
        canDeactivate: [NavigationGuard],
        data: { level: 1 }
      },
      {
        path: ':plant',
        component: AllocationMainComponent,
        canDeactivate: [NavigationGuard],
        data: { level: 1 }
      },
      {
        path: ':plant/date/:date',
        component: AllocationLvl2Component,
        canDeactivate: [NavigationGuard],
        data: { level: 2 }
      },
      {
        path: ':plant/date/:date/:type/:region_id',
        component: AllocationLvl3Component,
        canDeactivate: [NavigationGuard],
        data: { level: 3 }
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
    GraphicComponent,
    AllocationLvl3Component,
    AllocationBarComponent
  ]
})
export class AllocationModule { }
