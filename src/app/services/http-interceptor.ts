import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ToolsService } from './tools.service';
import { CookiesExpiredComponent } from 'app/dialogs/cookies-expired/cookies-expired.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private _dialog: MatDialog,
        private _api: ApiService,
        private _tools: ToolsService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;
        if (this._tools.xsrf_token) {
            request = req.clone({
                setHeaders: {
                    'X-XSRF-TOKEN': this._tools.xsrf_token
                }
            });
        }
        return next.handle(request).pipe(
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
        );
    }
}
