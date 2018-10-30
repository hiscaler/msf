import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Passport } from "./models/Passport";
import { environment } from "../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  private endpoint = 'passport/login';

  constructor(
    private http: HttpClient
  ) {
  }

  login(passport: Passport): Observable<any> {
    return this.http.post<Passport>(environment.apiPrefix + this.endpoint, passport, httpOptions).pipe(
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
