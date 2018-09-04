import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { ProductionProgramMainComponent } from './components/production-program-main/production-program-main.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { NumberPipe } from '@pipes/number.pipe';
import { SharedModule } from '@modules/shared/shared.module';

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
      }
    ]
   }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductionProgramMainComponent, 
    WrapperComponent, 
    GraphicComponent
  ]
})
export class ProductionProgramModule { }
