import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@modules/shared/shared.module';
import { DeliveriesComponent } from './components/deliveries/deliveries.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: DeliveriesComponent,
    data: { level: 1 }
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DeliveriesComponent,
    GraphicComponent
  ]
})
export class DeliveriesModule { }
