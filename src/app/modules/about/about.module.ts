import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

const routes: Routes = [
  {
    path: '', component: AboutComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    NgxJsonViewerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule { }
