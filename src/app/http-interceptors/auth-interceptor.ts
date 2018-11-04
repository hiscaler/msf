import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const baseUrl = 'http://localhost:8003/index.php/api/';

    const newReq = req.clone({
      url: `${baseUrl}${req.url}?accessToken=` + localStorage.getItem('accessToken')
    });

    return next.handle(newReq);

  }
}