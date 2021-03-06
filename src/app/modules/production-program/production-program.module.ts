import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { ProductionProgramMainComponent } from './components/production-program-main/production-program-main.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { SharedModule } from '@modules/shared/shared.module';
import { ProductionProgramLvl2Component } from './components/production-program-lvl2/production-program-lvl2.component';
import { ProductionProgramLvl3Component } from './components/production-program-lvl3/production-program-lvl3.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        component: ProductionProgramMainComponent,
        data: { level: 1 }
      },
      {
        path: ':year',
        component: ProductionProgramMainComponent,
        data: { level: 1 }
      },
      {
        path: ':year/:type/:id',
        component: ProductionProgramLvl2Component,
        data: { level: 2 }
      },
      {
        path: ':year/:type/:id/:type2/:region_id',
        component: ProductionProgramLvl3Component,
        data: { level: 3 }
      }
    ]
   }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductionProgramMainComponent,
    WrapperComponent,
    GraphicComponent,
    ProductionProgramLvl2Component,
    ProductionProgramLvl3Component
  ]
})
export class ProductionProgramModule { }
