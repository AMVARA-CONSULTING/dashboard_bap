import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions, PreloadAllModules } from '@angular/router';
import { AccessGranted } from './guards/access-granted.guard';
import { AccessCodeComponent } from '@components/access-code/access-code.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'order-intake',
    
  },
  {
    path: 'miami-access',
    component: AccessCodeComponent
  },
  { 
    path: 'order-intake',
    loadChildren: () => import('./modules/order-intake/order-intake.module').then(m => m.OrderIntakeModule),
    data: { title: 'order_intake' },
    canActivate: [AccessGranted]
  },
  {
    path: 'production-program', 
    loadChildren: () => import('./modules/production-program/production-program.module').then(m => m.ProductionProgramModule),
    data: { title: 'production_program' },
    canActivate: [AccessGranted]
  },
  {
    path: 'allocation',
    loadChildren: () => import('./modules/allocation/allocation.module').then(m => m.AllocationModule),
    data: { title: 'allocation' },
    canActivate: [AccessGranted]
  },
  {
    path: 'plant-stock',
    loadChildren: () => import('./modules/plant-stock/plant-stock.module').then(m => m.PlantStockModule),
    data: { title: 'plant_stock' },
    canActivate: [AccessGranted]
  },
  { 
    path: 'about',
    loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule),
    data: { title: 'about' },
    canActivate: [AccessGranted]
  },
  { 
    path: 'help', 
    loadChildren: () => import('./modules/help/help.module').then(m => m.HelpModule),
    data: { title: 'help' },
    canActivate: [AccessGranted]
  }
]


// Enable route parameters inheritance
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  preloadingStrategy: PreloadAllModules,
  useHash: true
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule]
})
export class RoutingModule { }
