import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '@modules/shared/shared.module';
import { NavigationGuard } from '../../guards/navigation-guard.service';

const routes: Routes = [
  {
    path: '', component: AboutComponent,
    canDeactivate: [NavigationGuard],
    data: { level: 1 },
  }
]

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    NgxJsonViewerModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AboutComponent
  ],
  exports: [
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class AboutModule { }
