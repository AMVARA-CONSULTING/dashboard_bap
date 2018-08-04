import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

// Global Components

import { AppComponent } from './components/root/app.component'
import { HeaderComponent } from './components/header/header.component'
import { LoaderComponent } from './components/loader/loader.component'

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

import { LoadingService } from './services/loading.service'
import { DataService } from './services/data.service'
import { ApiService } from './services/api.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ProductionProgramModule,
    AllocationModule,
    OrderIntakeModule,
    PlantStockModule,
    AboutModule,
    HelpModule
  ],
  providers: [
    LoadingService,
    DataService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
