import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    getCookie(name) {
      const value = '; ' + document.cookie;
      const parts = value.split('; ' + name + '=');
      if (parts.length == 2) return parts.pop().split(';').shift()
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;
        // Get XSRF Token either from cookie or localStorage, cookie has preference
        const xsrf = this.getCookie('XSRF-TOKEN') || localStorage.getItem('xsrf');
        if (xsrf) {
            request = req.clone({
                setHeaders: {
                    'X-XSRF-TOKEN': xsrf
                }
            });
        }
        return next.handle(request);
    }
}
