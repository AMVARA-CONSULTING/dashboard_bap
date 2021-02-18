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
    data: { title: 'activity' },
    canActivate: [AccessGranted],
    canLoad: [CapabilityAccess]
  },
  {
    path: 'sells',
    loadChildren: () => import('./modules/order-backlog/order-backlog.module').then(m => m.OrderBacklogModule),
    data: { title: 'sells' },
    canActivate: [AccessGranted],
    canLoad: [CapabilityAccess]
  },
  {
    path: 'employees',
    loadChildren: () => import('./modules/production-program/production-program.module').then(m => m.ProductionProgramModule),
    data: { title: 'employees' },
    canActivate: [AccessGranted],
    canLoad: [CapabilityAccess]
  },
  {
    path: 'covid',
    loadChildren: () => import('./modules/allocation/allocation.module').then(m => m.AllocationModule),
    data: { title: 'covid' },
    canActivate: [AccessGranted],
    canLoad: [CapabilityAccess]
  },
  {
    path: 'companies',
    loadChildren: () => import('./modules/plant-stock/plant-stock.module').then(m => m.PlantStockModule),
    data: { title: 'companies' },
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
