import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email: string;
password: string;

constructor(private authService: AuthService, private router: Router) { }

ngOnInit() {
}

signInWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => {
        this.router.navigate(['/'])
      })
    .catch((err) => console.log(err));
  }

signup() {
  this.authService.signup(this.email, this.password);
  this.email = this.password = '';
  this.router.navigate(['/']);
}

login() {
  this.authService.login(this.email, this.password);
  this.email = this.password = '';    
  this.router.navigate(['/']);
}

logout() {
  this.authService.logout();
  this.router.navigate(['/']);
}

}