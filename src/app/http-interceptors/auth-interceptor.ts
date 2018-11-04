import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let url = `http://localhost:8003/index.php/api/${req.url}`;
    const accessToken = localStorage.getItem('accessToken');
    console.info(req.url);
    if (accessToken && req.url != 'passport/login') {
      if (url.indexOf('?') !== -1) {
        url += '&';
      } else {
        url += '?';
      }
      url += `accessToken=${accessToken}`;
    }


    const authReq = req.clone({
      url: url
    });

    return next.handle(authReq).pipe(mergeMap((event: any) => {
        // 正常返回，处理具体返回参数
        if (event instanceof HttpResponse && event.status === 200)
          return this.handleData(event);//具体处理请求返回数据
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err))
    );
  }


  private handleData(
    event: HttpResponse<any>|HttpErrorResponse,
  ): Observable<any> {
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        if (event instanceof HttpResponse) {
          const body: any = event.body;
          if (body && body.rc == 3) {
            // this.goTo('/test');
          }
        }
        break;
      case 400: // 未登录状态码
      case 401: // 未登录状态码
        // this.goTo('/login');
        break;
      case 404:
      case 500:
        break;
      default:
        return of(event);
    }

  }
}