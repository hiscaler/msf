import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const url = 'http://localhost:8003/index.php/api/';

    const authReq = req.clone({
      url: url + req.url + '&accessToken=' + localStorage.getItem('accessToken'),
      headers: req.headers.set('token', localStorage.getItem('token'))
    });

    return next.handle(authReq).pipe(mergeMap((event: any) => {
        // 正常返回，处理具体返回参数
        alert('ddd');
        if (event instanceof HttpResponse && event.status === 200)
          return this.handleData(event);//具体处理请求返回数据
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)))
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