import { Injectable } from '@angular/core';
import { Member } from './models/Member';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private url = 'member';

  constructor(
    private http: HttpClient
  ) {
  }

  getWebsites(): Observable<Member[]> {
    return this.http.get<Member[]>(this.url).pipe(
      catchError(this.handleError('getHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
