import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

	constructor(private firebaseAuth: AngularFireAuth, private router: Router) { 
      this.user = firebaseAuth.authState;

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
          }
          else {
            this.userDetails = null;
          }
        }
      );
  }


  signInWithFacebook() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.userDetails = null;    
  }

    isAdmin() {
      if (this.firebaseAuth.auth.currentUser.email.match('lazin_ale@yahoo.com'))
        return true;
      return false;
  }

  isLoggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }
}