import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData = '';

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(data => {
      if (data) {
        this.userData = data.email;
        console.log(data);
      }
    });
  }

  logoutUser() {
    this.afAuth.auth.signOut().then(response => {
      console.log(response);
      this.userData = '';
    })
    .catch(error => {
      console.log(error);
    });
  }
}