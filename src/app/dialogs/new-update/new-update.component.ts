import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InterceptorParams } from 'network-error-handling';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'new-update',
  templateUrl: './new-update.component.html',
  styleUrls: ['./new-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUpdateComponent {

  constructor(
    private _http: HttpClient
  ) { }

  reload() {
    const path = `${location.protocol}//${location.host}${location.pathname}`;
    this._http.get(path, {
      responseType: 'text',
      params: new InterceptorParams({
        skipInterceptor: true,
        ignoreServiceWorkerCache: true,
        ignoreProxyCache: true,
        ignoreDiskCache: true
      })
    }).pipe(
      finalize(() => location.reload(true))
    ).subscribe()
  }

}
