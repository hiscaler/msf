import { Component, OnInit } from '@angular/core';
import { Passport } from "../models/Passport";
import { PassportService } from "../passport.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passport: Passport = {
    username: '',
    password: '',
    accessToken: ''
  };

  constructor(
    private passportService: PassportService
  ) {
  }

  ngOnInit() {
  }

  login(passport: Passport): boolean {
    this.passportService.login(passport).subscribe(resp => this.passport = resp);

    return false;
  }

}
