import { NgModule } from '@angular/core';
import { NumberPipe } from '@pipes/number.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectYearComponent } from '../../dialogs/select-year/select-year.component';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MAT_SELECT_CONFIG } from '@angular/material/select';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoginDialog } from 'app/dialogs/login/login.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatRadioModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [
    NumberPipe,
    SelectYearComponent,
    DipCircularMetersComponent,
    DipQuadroCircularMetersComponent,
    PlantStockSortingPipe,
    ReportInfoComponent,
    ThemeSwitcherComponent,
    LoginDialog
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RoundProgressModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient],
      }
    }),
    ...materialModules
  ],
  providers: [
    {
      provide: MAT_SELECT_CONFIG,
      useValue: {
        overlayPanelClass: 'mat-select-overlay'
      }
    }
  ],
  exports: [
    NumberPipe,
    SelectYearComponent,
    LoginDialog,
    FormsModule,
    ReactiveFormsModule,
    DipQuadroCircularMetersComponent,
    DipCircularMetersComponent,
    RoundProgressModule,
    ReportInfoComponent,
    TranslateModule,
    PlantStockSortingPipe,
    ThemeSwitcherComponent,
    ...materialModules
  ]
})
export class SharedModule { }
