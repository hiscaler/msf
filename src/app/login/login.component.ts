import { Component, OnInit } from '@angular/core';
import { Passport } from "../models/Passport";
import { PassportService } from "../passport.service";
import { FlashMessageService } from "../services/flash-message.service";
import { error } from "util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passport: Passport = {
    username: '',
    password: '',
  };

  constructor(
    private passportService: PassportService,
    private flashMessageService: FlashMessageService
  ) {
  }

  ngOnInit() {
  }

  login(passport: Passport):
    boolean {
    this.passportService.login(passport).subscribe(
      response => {
        console.info(response);
        if (response) {
          if (response.success) {
            localStorage.setItem('accessToken', response.data.accessToken);
          } else {
            this.flashMessageService.set(response.data.message);
          }
        }
      },
      error => {
        console.error('Error');
      }
    );

    return false;
  }

}
