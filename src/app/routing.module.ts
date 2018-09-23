import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: '/order-intake' 
  },
  { 
    path: 'order-intake', 
    loadChildren: './modules/order-intake/order-intake.module#OrderIntakeModule', 
    data: { title: 'order_intake' }
  },
  {
    path: 'production-program', 
    loadChildren: './modules/production-program/production-program.module#ProductionProgramModule',
    data: { title: 'production_program' }
  },
  {
    path: 'allocation',
    loadChildren: './modules/allocation/allocation.module#AllocationModule',
    data: { title: 'allocation' }
  },
  {
    path: 'plant-stock',
    loadChildren: './modules/plant-stock/plant-stock.module#PlantStockModule',
    data: { title: 'plant_stock' }
  },
  { 
    path: 'about',
    loadChildren: './modules/about/about.module#AboutModule',
    data: { title: 'about' }
  },
  { 
    path: 'help', 
    loadChildren: './modules/help/help.module#HelpModule',
    data: { title: 'help' }
  }
]


// Enable route parameters inheritance
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  useHash: true,
  relativeLinkResolution: 'corrected'
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule]
})
export class RoutingModule { }
