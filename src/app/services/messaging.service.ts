import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { messaging } from 'firebase/app'
import { take } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  public messaging = messaging()
  public currentMessage = new BehaviorSubject(null)

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  updateToken(token) {
    this.afAuth.authState.pipe(take(1)).subscribe(
      user => {
        if (!user) return;

        const data = { [user.uid]: token }
        // this.db.object('fcmTokens/').update(data)
      }
    )
  }

  getPermission() {
      this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log(token)
        this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    }

    receiveMessage() {
      this.messaging.onMessage((payload) => {
        console.log("Message Received", payload);
        this.currentMessage.next(payload)
      });
    }
}