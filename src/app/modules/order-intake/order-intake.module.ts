import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderIntakeMainComponent } from './components/order-intake-main/order-intake-main.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: OrderIntakeMainComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [OrderIntakeMainComponent]
})
export class OrderIntakeModule { }
