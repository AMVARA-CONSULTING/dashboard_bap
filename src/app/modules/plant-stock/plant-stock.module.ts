import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { PlantStockMainComponent } from './components/plant-stock-main/plant-stock-main.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';
import { GraphicComponent } from './components/graphic/graphic.component';
import { PlantStockLvl2Component } from './components/plant-stock-lvl2/plant-stock-lvl2.component';
import { PlantStockLvl3Component } from './components/plant-stock-lvl3/plant-stock-lvl3.component';

// Names of the routes for each level
var second_level_route: string = 'cities'
var third_level_route: string = 'city'

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        component: PlantStockMainComponent,
        data: { level: 1 }
      },
      {
        path: ':plant',
        component: PlantStockMainComponent,
        data: { level: 1 }
      },
      {
        path: ':plant/' + second_level_route + '/:werk',
        component: PlantStockLvl2Component,
        data: { level: 2 }
      },
      {
        path: ':plant/' + second_level_route + '/:werk/' + third_level_route + '/:hofb',
        component: PlantStockLvl3Component,
        data: { level: 3 }
      }
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule
  ],
  declarations: [
    WrapperComponent,
    PlantStockMainComponent,
    GraphicComponent,
    PlantStockLvl2Component,
    PlantStockLvl3Component
  ]
})
export class PlantStockModule { }
