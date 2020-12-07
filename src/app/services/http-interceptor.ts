import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToolsService } from './tools.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private _tools: ToolsService
    ) { }

    getCookie(name) {
      const value = '; ' + document.cookie;
      const parts = value.split('; ' + name + '=');
      if (parts.length == 2) return parts.pop().split(';').shift()
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;
        // Get XSRF Token either from cookie or previously saved, cookie has preference
        const xsrf = this.getCookie('XSRF-TOKEN') || this._tools.xsrf_token;
        if (xsrf) {
            request = req.clone({
                setHeaders: {
                    'X-XSRF-TOKEN': xsrf
                }
            });
        }
        return next.handle(request);
        /* .pipe(
            filter(e => e.type !== 0),
            tap(_ => {
                if (!this._api.authorized && !this._api.reloadDialog) {
                    this._api.reloadDialog = this._dialog.open(CookiesExpiredComponent, {
                        panelClass: 'newUpdate',
                        disableClose: true,
                        closeOnNavigation: false
                    });
                }
            })
        ); */
    }
}
