import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Passport } from "./models/Passport";
import { environment } from "../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': "application/x-www-form-urlencoded"})
};

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  private endpoint = environment.apiPrefix + 'passport/login';

  constructor(
    private http: HttpClient
  ) {
  }

  login(passport: Passport): Observable<any> {
    const data = new HttpParams()
      .append("username", passport.username)
      .append("password", passport.password);

    return this.http.post<Passport>(this.endpoint, data, httpOptions).pipe(
      catchError(this.handleError<Passport>('login'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
