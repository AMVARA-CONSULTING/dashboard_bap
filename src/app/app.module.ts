import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Global Components

import { AppComponent } from '@components/root/app.component'
import { HeaderComponent } from '@components/header/header.component'
import { LoaderComponent } from '@components/loader/loader.component'
import { FooterComponent } from '@components/footer/footer.component'

// App Modules - Aka pages

import { ProductionProgramModule } from '@modules/production-program/production-program.module'
import { AllocationModule } from '@modules/allocation/allocation.module'
import { OrderIntakeModule } from '@modules/order-intake/order-intake.module'
import { PlantStockModule } from '@modules/plant-stock/plant-stock.module'
import { AboutModule } from '@modules/about/about.module'
import { HelpModule } from '@modules/help/help.module'

// Routing Module
// We have to import a Custom Routing Module from another module designed for that.

import { RoutingModule } from './routing.module'

// Services - aka providers
// Used to communicate components

import { LoadingService } from '@services/loading.service'
import { DataService } from '@services/data.service'
import { ApiService } from '@services/api.service'
import { ConfigService } from '@services/config.service';
import { ConnectionService } from 'ng-connection-service';

// Plugins
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// Angular Material
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToolsService } from '@services/tools.service';
import { SelectYearComponent } from './dialogs/select-year/select-year.component';
import { HttpClient } from '@angular/common/http';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    // Pages Modules
    ProductionProgramModule,
    AllocationModule,
    OrderIntakeModule,
    PlantStockModule,
    AboutModule,
    HelpModule,
    // Angular Material Modules
    MatTooltipModule,
    MatSidenavModule,
    // Plugins
    RoundProgressModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient],
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    SelectYearComponent
  ],
  providers: [
    LoadingService,
    DataService,
    ApiService,
    ConnectionService,
    ConfigService,
    ToolsService,
    {
      // This loads the config.json file before the App is initialized
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () => configService.load(),
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
