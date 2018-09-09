import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/order-intake' },
  { path: 'order-intake', loadChildren: './modules/order-intake/order-intake.module#OrderIntakeModule' },
  { path: 'production-program', loadChildren: './modules/production-program/production-program.module#ProductionProgramModule' },
  { path: 'about', loadChildren: './modules/about/about.module#AboutModule' },
  { path: 'help', loadChildren: './modules/help/help.module#HelpModule' }
]


// Enable route parameters inheritance
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule]
})
export class RoutingModule { }
