import { BrowserModule, HammerModule } from '@angular/platform-browser';
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

import { SelectYearComponent } from './dialogs/select-year/select-year.component';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewUpdateComponent } from './dialogs/new-update/new-update.component';
import { AccessCodeComponent } from './components/access-code/access-code.component';
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
import { SharedModule } from '@modules/shared/shared.module';
import { environment } from 'environments/environment';

/** Store States */
import { OrderBacklogState } from '@store/order-backlog.state';
import { OrderIntakeHistoryState } from '@store/order-intake-history.state';
import { ConfigState } from '@store/config.state';
// import { ServiceWorkerModule } from '@angular/service-worker';

import { NgxNetworkErrorModule } from 'ngx-network-error';

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
        RoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        HammerModule,
        NgxsModule.forRoot([
            OrderIntakeHistoryState,
            OrderBacklogState,
            ConfigState
        ], {
            developmentMode: !environment.production
        }),
        NgxsSelectSnapshotModule.forRoot(),
        NgxsLoggerPluginModule.forRoot({
            disabled: environment.production
        }),
        // Plugins
        RoundProgressModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient],
            }
        }),
        NgxNetworkErrorModule.forRoot({
            reporting: {
                // depending on foo-function (see at bottom here) ... returns DSN or empty
                // environment.production = true => returns DSN ... all other empty
                sentryDSN: foo(environment.production)
            },
            debug: !environment.production,
            authType: 'cognos',
            cognosNamespace: 'EMEA'
        })
        // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.development })
    ],
    providers: [
        DataService,
        ApiService,
        ConnectionService,
        ConfigService,
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

/**
 * this is foo function returns sentry DSN depending on environment.production
 * if true ... returns and enables sentry messages
 * @author Ralf Roeber
 * @since 27.02.2021
 * @param envProd
 */
function foo(envProd: boolean): string {
  // console.log("==============> ", envProd)
  // on Production return sentry DSN ... on DEV return empty
  return envProd ? 'https://b75afd9cf4c649b9b06e341b545ecd27@sentry.amvara.de/7' : ""
}