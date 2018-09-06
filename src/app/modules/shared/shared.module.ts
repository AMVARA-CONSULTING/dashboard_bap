import { NgModule } from '@angular/core';
import { NumberPipe } from '@pipes/number.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectYearComponent } from '../../dialogs/select-year/select-year.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    NumberPipe,
    SelectYearComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    CommonModule,
    MatSelectModule
  ],
  exports: [
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    NumberPipe,
    SelectYearComponent,
    MatRadioModule,
    FormsModule,
    MatSelectModule
  ]
})
export class SharedModule { }
