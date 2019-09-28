import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging'
import { take } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  public currentMessage = new BehaviorSubject(null)

  constructor(
    private db: DatabaseService,
    private afa: AngularFireAuth,
    private afm:AngularFireMessaging
  ) {
    this.afm.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  requestPermission() {
    this.afm.requestToken.subscribe(
      (token) => {
        console.info('MESS TKN', token)
        this.db.updateMessagingToken(token)
      },
      (err) => {
        console.error('Unable to get notify permission.', err)
      }
    )
  }
  
  receiveMessage() {
    this.afm.messages.subscribe(
      (payload) => {
        console.debug('Nw Msg', payload)
        this.currentMessage.next(payload)
      }
    )
  }
}