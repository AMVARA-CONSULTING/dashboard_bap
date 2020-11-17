import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToolsService } from './tools.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private dialog: MatDialog,
        private api: ApiService,
        private _tools: ToolsService
    ) { }

    private handleAuthError(err: HttpErrorResponse) {
        if ((err.status === 401 || err.status === 403 || err.status === 404) && err.url.indexOf('DIPLogV_Color_DarkBack') === -1) {
            this.api.openCookiesPopup();
            return throwError(err);
        }
        return throwError(err);
    }

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
            tap(_ => {
                if (!this.api.authorized) {
                    this.api.openCookiesPopup();
                }
            }),
            catchError((err: HttpErrorResponse) => {
                return this.handleAuthError(err);
            })
        )
    }
}
