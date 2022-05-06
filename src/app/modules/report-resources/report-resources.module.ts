import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportWrapperComponent } from './components/wrapper/wrapper.component';
import { RouterModule } from '@angular/router';
import { LetDirective } from './directives/ng-let.directive';
import { HighestZoneTotalPipe } from './pipes/highest-zone-total.pipe';
import { SumQuantityPipe } from './pipes/sum-quantity.pipe';
import { FilterDayPipe } from './pipes/filter-day.pipe';
import { ReportGraphicComponent } from './components/graphic/graphic.component';
import { GroupOrPlantNamePipe } from './pipes/group-or-plant-name.pipe';
import { StartWithPipe } from './pipes/start-with.pipe';
import { SharedModule } from '@modules/shared/shared.module';
import { PercentPipe } from './pipes/percent.pipe';
import { FormatLatestDayPipe } from './pipes/format-latest-day.pipe';
import { ReportHeaderComponent } from './components/report-header/report-header.component';
import { PlantsByZonePipe } from './pipes/plants-by-zone.pipe';
import { DifferencePipe } from './pipes/difference.pipe';
import { FilterYearPipe } from './pipes/filter-year.pipe';
import { DistinctMonthsPipe } from './pipes/distinct-months.pipe';
import { DistinctYearsPipe } from './pipes/distinct-years.pipe';
import { ReportGraphicComparisonComponent } from './components/graphic-comparison/graphic-comparison.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReversePipe } from './pipes/reverse.pipe';
import { MonthFormatPipe } from './pipes/month-format.pipe';
import { PreviousMonthPipe } from './pipes/previous-month.pipe';
import { ProductRegionLabelFormatPipe } from './pipes/product-region-label-format.pipe';
import { JoinArraysPipe } from './pipes/join-arrays.pipe';
import { DistinctItemsPipe } from './pipes/distinct-items.pipe';
import { ProductRegionChartComponent } from './components/product-region-chart/product-region-chart.component';
import { MaxPipe } from './pipes/max.pipe';
import { DefaultPipe } from './pipes/default.pipe';
import { AbsPipe } from './pipes/abs.pipe';
import { MockMissingPreviousRowsPipe } from './pipes/mock-missing-previous-rows.pipe';
import { LogPipe } from './pipes/log.pipe';
import { ValueSignPipe } from './pipes/value-sign.pipe';
import { NgxsModule } from '@ngxs/store';
import { OrderBacklogState } from '@store/order-backlog.state';
import { OrderIntakeHistoryState } from '@store/order-intake-history.state';

@NgModule({
  declarations: [
    // Components
    ReportWrapperComponent,
    ReportGraphicComponent,
    ReportGraphicComparisonComponent,
    ReportHeaderComponent,
    ProductRegionChartComponent,
    // Directives
    LetDirective,
    // Pipes
    HighestZoneTotalPipe,
    SumQuantityPipe,
    FilterDayPipe,
    GroupOrPlantNamePipe,
    StartWithPipe,
    PercentPipe,
    FormatLatestDayPipe,
    PlantsByZonePipe,
    DifferencePipe,
    FilterYearPipe,
    DistinctMonthsPipe,
    DistinctYearsPipe,
    ReversePipe,
    MonthFormatPipe,
    PreviousMonthPipe,
    ProductRegionLabelFormatPipe,
    JoinArraysPipe,
    DistinctItemsPipe,
    MaxPipe,
    DefaultPipe,
    AbsPipe,
    MockMissingPreviousRowsPipe,
    LogPipe,
    ValueSignPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgxChartsModule,
    NgxsModule.forFeature([
      OrderBacklogState,
      OrderIntakeHistoryState
    ])
  ],
  exports: [
    // Components
    ReportGraphicComponent,
    ReportGraphicComparisonComponent,
    ReportHeaderComponent,
    ProductRegionChartComponent,
    // Directives
    LetDirective,
    // Pipes
    FilterDayPipe,
    SumQuantityPipe,
    GroupOrPlantNamePipe,
    StartWithPipe,
    PercentPipe,
    FormatLatestDayPipe,
    PlantsByZonePipe,
    DifferencePipe,
    FilterYearPipe,
    DistinctMonthsPipe,
    DistinctYearsPipe,
    ReversePipe,
    MonthFormatPipe,
    PreviousMonthPipe,
    ProductRegionLabelFormatPipe,
    JoinArraysPipe,
    DistinctItemsPipe,
    MaxPipe,
    DefaultPipe,
    AbsPipe,
    MockMissingPreviousRowsPipe,
    LogPipe
  ]
})
export class ReportResourcesModule { }
