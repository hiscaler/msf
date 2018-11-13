import { Injectable } from '@angular/core';
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() {
  }

  handleError(response: any) {
    let errorMessage: any = {};
    // Connection error
    if (response.error.status === 0) {
      errorMessage = {
        success: false,
        status: 0,
        data: 'Sorry, there was a connection error occurred. Please try again.'
      };
    } else {
      errorMessage = response.error;
    }

    return throwError(errorMessage);
  }

}
