import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth, router: Router) {
    this.user = afAuth.authState;
    this.user.subscribe(user => {
      if (!user) {
        router.navigateByUrl('/login');
      } else if (user) {
        console.log(user.getIdToken());
        router.navigateByUrl('/dashboard');
      }
    });
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
