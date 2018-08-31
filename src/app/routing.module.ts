import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/order-intake' },
  { path: 'order-intake', loadChildren: './modules/order-intake/order-intake.module#OrderIntakeModule' },
  { path: 'production-program', loadChildren: './modules/production-program/production-program.module#ProductionProgramModule' },
  { path: 'about', loadChildren: './modules/about/about.module#AboutModule' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
