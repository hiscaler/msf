import { Component, OnInit } from '@angular/core';
import { Passport } from '../../models/Passport';
import { PassportService } from '../../services/passport.service';
import { FlashMessageService } from '../../services/flash-message.service';
import { Router } from "@angular/router";

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
    private flashMessageService: FlashMessageService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  login(passport: Passport): boolean {
    this.passportService.login(passport).subscribe(
      response => {
        if (response) {
          if (response.success) {
            localStorage.setItem('accessToken', response.data.accessToken);
            setTimeout(() => this.router.navigateByUrl('/'));
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
