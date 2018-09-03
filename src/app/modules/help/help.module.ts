import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './components/help/help.component';
import { TitleComponent } from './components/title/title.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path: '', component: HelpComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HelpComponent, TitleComponent, ContactComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HelpModule { }
