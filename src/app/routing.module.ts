import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions, PreloadAllModules } from '@angular/router';
import { AccessGranted } from './guards/access-granted.guard';
import { AccessCodeComponent } from '@components/access-code/access-code.component';
import { CapabilityAccess } from './guards/capability-access.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'activity',
  },
  {
    path: 'miami-access',
    component: AccessCodeComponent
  },
  {
    path: 'activity',
    loadChildren: () => import('./modules/order-intake/order-intake.module').then(m => m.OrderIntakeModule),
    data: { title: 'order_intake' },
    canActivate: [AccessGranted],
    canLoad: [CapabilityAccess]
  },
  {
    path: 'sells',
    loadChildren: () => import('./modules/order-backlog/order-backlog.module').then(m => m.OrderBacklogModule),
    data: { title: 'order_backlog' },
    canActivate: [AccessGranted],
    canLoad: [CapabilityAccess]
  },
  {
    path: 'employees',
    loadChildren: () => import('./modules/production-program/production-program.module').then(m => m.ProductionProgramModule),
    data: { title: 'production_program' },
    canActivate: [AccessGranted],
    canLoad: [CapabilityAccess]
  },
  {
    path: 'covid',
    loadChildren: () => import('./modules/allocation/allocation.module').then(m => m.AllocationModule),
    data: { title: 'allocation' },
    canActivate: [AccessGranted],
    canLoad: [CapabilityAccess]
  },
  {
    path: 'companies',
    loadChildren: () => import('./modules/plant-stock/plant-stock.module').then(m => m.PlantStockModule),
    data: { title: 'plant_stock' },
    canActivate: [AccessGranted],
    canLoad: [CapabilityAccess]
  },
  {
    path: 'shipped',
    loadChildren: () => import('./modules/deliveries/deliveries.module').then(m => m.DeliveriesModule),
    data: { title: 'deliveries' },
    canActivate: [AccessGranted],
    canLoad: [CapabilityAccess]
  },
  {
    path: 'ecommerce evolution',
    loadChildren: () => import('./modules/order-intake-history/order-intake-history.module').then(m => m.OrderIntakeHistoryModule),
    data: { title: 'order_intake_history' },
    canActivate: [AccessGranted],
    canLoad: [CapabilityAccess]
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
];


// Enable route parameters inheritance
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  preloadingStrategy: PreloadAllModules,
  useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  providers: [
    AccessGranted,
    CapabilityAccess
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
