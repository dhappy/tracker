import * as firebase from 'firebase/app'
import {} from 'firebase/messaging'

firebase.initializeApp({
  'messagingSenderId': 'thisisalittletest'
});

const messaging = firebase.messaging()