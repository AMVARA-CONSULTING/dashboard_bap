import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "./api.service";
import { throwError } from "rxjs/internal/observable/throwError";
import { Observable } from "rxjs/internal/Observable";
import { tap } from "rxjs/internal/operators/tap";
import { catchError } from "rxjs/internal/operators/catchError";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private dialog: MatDialog,
        private api: ApiService
    ) { }

    private handleAuthError(err: HttpErrorResponse) {
        if ((err.status === 401 || err.status === 403 || err.status == 404) && err.url.indexOf('DIPLogV_Color_DarkBack') == -1) {
            this.api.openCookiesPopup()
            return throwError(err)
        }
        return throwError(err)
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(_ => {
                if (!this.api.authorized) {
                    this.api.openCookiesPopup()
                }
            }),
            catchError((err: HttpErrorResponse) => {
                return this.handleAuthError(err)
            })
        )
    }

    handleError() {

    }
}