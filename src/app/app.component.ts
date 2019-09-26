import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { DatabaseService } from './services/database.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private routedComponent:OnInit

  constructor(
    public afAuth:AngularFireAuth,
    public db:DatabaseService
  ) {
    afAuth.auth.onAuthStateChanged(
      user => {
        db.user = user
        this.routedComponent.ngOnInit()
      }
    )
  }

  ngOnInit() {}

  public setRoutedComponent(componentRef:OnInit) {
    this.routedComponent = componentRef
  }

  login() {
    this.afAuth.auth
    .signInWithPopup(new auth.GoogleAuthProvider())
    .then(
      result => {
        this.db.user = result.user
        this.routedComponent.ngOnInit()
      }
    )
    .catch(
      error => console.error('Auth Error', error)
    )
  }

  logout() {
    this.afAuth.auth.signOut()
  }
}
