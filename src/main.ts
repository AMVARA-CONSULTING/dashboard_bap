import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs';
import 'hammer-timejs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
     registration.unregister()
   } })
})
.catch(err => console.log(err));
