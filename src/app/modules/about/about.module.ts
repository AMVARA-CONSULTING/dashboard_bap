import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: { level: 1 }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule { }
