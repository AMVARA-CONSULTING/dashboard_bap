import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { ProductionProgramMainComponent } from './components/production-program-main/production-program-main.component';

const routes: Routes = [
  { path: '', component: ProductionProgramMainComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductionProgramMainComponent]
})
export class ProductionProgramModule { }
