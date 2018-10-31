import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {

  message: string;

  constructor() {
  }

  set(msg: string) {
    this.message = msg;
  }

  get() {
    return this.message;
  }

  clear() {
    this.message = null;
  }

}
