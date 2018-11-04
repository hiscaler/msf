import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators';

/*设置请求的基地址，方便替换*/
const baseurl = 'http://localhost:8360';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newReq = req.clone({
      url: `${baseurl}${req.url}?accessToken=` + localStorage.getItem('accessToken'),
    });

    /*此处设置额外的头部，token常用于登陆令牌*/
    // if (!req.cancelToken) {
    //   /*token数据来源自己设置，我常用localStorage存取相关数据*/
    //   newReq.headers =
    //     newReq.headers.set('token', 'my-new-auth-token')
    // }

    // send cloned request with header to the next handler.
    return next.handle(newReq);
  }

  private handleError(error: HttpErrorResponse) {
    console.info(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}