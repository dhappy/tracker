import { Component } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Habit Tracker'

  constructor(public afAuth: AngularFireAuth) {
    console.info('Start User', afAuth.auth.currentUser)
    afAuth.auth.signInAnonymously().catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        console.error('Anonymous Login Error', error);
      }
    })

    afAuth.auth.onAuthStateChanged(
      (user) => console.info('User', user, afAuth.auth.currentUser)
    )
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
