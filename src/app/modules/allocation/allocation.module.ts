import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllocationMainComponent } from './components/allocation-main/allocation-main.component';
import { SharedModule } from '@modules/shared/shared.module';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { Routes, RouterModule } from '@angular/router';

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
    WrapperComponent
  ]
})
export class AllocationModule { }
