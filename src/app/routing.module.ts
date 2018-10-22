import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AccessGranted } from './guards/access-granted.guard';
import { AccessCodeComponent } from '@components/access-code/access-code.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: '/order-intake' 
  },
  {
    path: 'miami-access',
    component: AccessCodeComponent
  },
  { 
    path: 'order-intake', 
    loadChildren: './modules/order-intake/order-intake.module#OrderIntakeModule', 
    data: { title: 'order_intake' },
    canActivate: [AccessGranted]
  },
  {
    path: 'production-program', 
    loadChildren: './modules/production-program/production-program.module#ProductionProgramModule',
    data: { title: 'production_program' },
    canActivate: [AccessGranted]
  },
  {
    path: 'allocation',
    loadChildren: './modules/allocation/allocation.module#AllocationModule',
    data: { title: 'allocation' },
    canActivate: [AccessGranted]
  },
  {
    path: 'plant-stock',
    loadChildren: './modules/plant-stock/plant-stock.module#PlantStockModule',
    data: { title: 'plant_stock' },
    canActivate: [AccessGranted]
  },
  { 
    path: 'about',
    loadChildren: './modules/about/about.module#AboutModule',
    data: { title: 'about' },
    canActivate: [AccessGranted]
  },
  { 
    path: 'help', 
    loadChildren: './modules/help/help.module#HelpModule',
    data: { title: 'help' },
    canActivate: [AccessGranted]
  }
]


// Enable route parameters inheritance
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  useHash: true
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule]
})
export class RoutingModule { }
