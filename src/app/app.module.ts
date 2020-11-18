import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injectable } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Global Components

import { AppComponent } from '@components/root/app.component';
import { HeaderComponent } from '@components/header/header.component';
import { LoaderComponent } from '@components/loader/loader.component';
import { FooterComponent } from '@components/footer/footer.component';

// Routing Module
// We have to import a Custom Routing Module from another module designed for that.

import { RoutingModule } from './routing.module';

// Services - aka providers
// Used to communicate components

import { DataService } from '@services/data.service';
import { ApiService } from '@services/api.service';
import { ConfigService } from '@services/config.service';
import { ConnectionService } from 'ng-connection-service';

// Plugins

import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';

// Angular Material

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolsService } from '@services/tools.service';
import { SelectYearComponent } from './dialogs/select-year/select-year.component';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewUpdateComponent } from './dialogs/new-update/new-update.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NavigationGuard } from './guards/navigation-guard.guard';
import { AccessCodeComponent } from './components/access-code/access-code.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CognosService } from '@services/cognos.service';
import { CookiesExpiredComponent } from './dialogs/cookies-expired/cookies-expired.component';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { AuthInterceptor } from '@services/http-interceptor';
import { APP_BASE_HREF } from '@angular/common';
import { OnlyNumbers } from './directives/only-numbers.directive';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from '@modules/shared/shared.module';
import { environment } from 'environments/environment';

/** Store States */
import { OrderBacklogState } from '@store/order-backlog.state';
import { ConfigState } from '@store/config.state';

declare var Hammer: any;

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'swipe': { direction: Hammer.DIRECTION_HORIZONTAL }
  };
  buildHammer(element: HTMLElement) {
    return new Hammer(element, {
      touchAction: 'pan-y',
    });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    FooterComponent,
    NewUpdateComponent,
    AccessCodeComponent,
    CookiesExpiredComponent,
    OnlyNumbers
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      OrderBacklogState,
      ConfigState
    ], {
      developmentMode: !environment.production
    }),
    NgxsSelectSnapshotModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    // Angular Material Modules
    MatTooltipModule,
    MatSidenavModule,
    MatDialogModule,
    // Plugins
    RoundProgressModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient],
      }
    }),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.development })
  ],
  entryComponents: [
    SelectYearComponent,
    NewUpdateComponent,
    CookiesExpiredComponent
  ],
  providers: [
    DataService,
    ApiService,
    ConnectionService,
    ConfigService,
    ToolsService,
    NavigationGuard,
    CognosService,
    AuthInterceptor,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    {
      // This loads the config.json file before the App is initialized
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () => configService.load(),
      deps: [ConfigService, CognosService, ApiService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      deps: [ConfigService, ApiService, ToolsService],
      multi: true
    },
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
