import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { PlantStockMainComponent } from './components/plant-stock-main/plant-stock-main.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';
import { GraphicComponent } from './components/graphic/graphic.component';

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
  declarations: [WrapperComponent, PlantStockMainComponent, GraphicComponent]
})
export class PlantStockModule { }
