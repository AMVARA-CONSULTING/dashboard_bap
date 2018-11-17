import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, throwError } from 'rxjs' 
import { catchError, tap } from "rxjs/operators";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { CookiesExpiredComponent } from "app/dialogs/cookies-expired/cookies-expired.component";
import { ApiService } from "./api.service";

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