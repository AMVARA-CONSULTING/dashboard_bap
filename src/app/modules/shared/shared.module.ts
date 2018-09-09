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
import { DipQuadroCircularMetersComponent } from '@components/quadro-circular-meters/quadro-circular-meters.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [
    NumberPipe,
    SelectYearComponent,
    DipQuadroCircularMetersComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    CommonModule,
    MatSelectModule,
    MatTooltipModule,
    RoundProgressModule
  ],
  exports: [
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    NumberPipe,
    SelectYearComponent,
    MatRadioModule,
    FormsModule,
    MatSelectModule,
    DipQuadroCircularMetersComponent,
    RoundProgressModule
  ]
})
export class SharedModule { }
