import { NgModule } from '@angular/core';
import { NumberPipe } from '@pipes/number.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectYearComponent } from '../../dialogs/select-year/select-year.component';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { DipQuadroCircularMetersComponent } from '@components/quadro-circular-meters/quadro-circular-meters.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DipCircularMetersComponent } from '@components/circular-meters/circular-meters.component';
import { PlantStockSortingPipe } from '@pipes/plant-stock-sorting.pipe';
import { ReportInfoComponent } from '@components/report-info/report-info.component';
import { ThemeSwitcherComponent } from '@components/theme-switcher/theme-switcher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    NumberPipe,
    SelectYearComponent,
    DipCircularMetersComponent,
    DipQuadroCircularMetersComponent,
    PlantStockSortingPipe,
    ReportInfoComponent,
    ThemeSwitcherComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    MatSelectModule,
    MatTooltipModule,
    RoundProgressModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient],
      }
    }),
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
    ReactiveFormsModule,
    MatSelectModule,
    DipQuadroCircularMetersComponent,
    DipCircularMetersComponent,
    RoundProgressModule,
    ReportInfoComponent,
    TranslateModule,
    PlantStockSortingPipe,
    ThemeSwitcherComponent
  ]
})
export class SharedModule { }
