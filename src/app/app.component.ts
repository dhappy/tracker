import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { DatabaseService } from './services/database.service'
import { Breadcrumb } from './models/Breadcrumb'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public crumbs:Breadcrumb[] = []

  constructor(
    public afAuth:AngularFireAuth,
    public db:DatabaseService
  ) {
    afAuth.auth.onAuthStateChanged(
      user => db.userId = !user ? undefined : user.uid
    )
  }

  ngOnInit() {
    console.info('Cr', this)
    this.crumbs = [
      { link: '/', text: 'Tracker'}
    ]
  }

  login() {
    this.afAuth.auth
    .signInWithPopup(new auth.GoogleAuthProvider())
    .then(
      result => this.db.userId = result.user.uid
    )
    .catch(
      error => console.error('Auth Error', error)
    )
  }

  logout() {
    this.afAuth.auth.signOut()
  }
}
