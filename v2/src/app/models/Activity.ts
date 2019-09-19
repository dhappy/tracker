import * as firebase from 'firebase/app'
import Timestamp = firebase.firestore.Timestamp

export class Activity {
  public id:string
  public type:string = 'activity'
  public name:string
  public color:string
  public lastEventAt:Timestamp
  public timeDelta:string
  private intervalId:number

  constructor(base:any) {
    this.intervalId = setInterval(
      () => this.timeDelta = this.deltaCounter(),
      1000
    )

    return Object.assign(this, base)
  }

  deltaCounter(epoch?, now?) {
    let out = ''

    if(!epoch) epoch = this.lastEventAt

    if(epoch) {
      if(!now) now = Timestamp.now()

      const dMillis = now.toMillis() - epoch.toMillis()
      const seconds = Math.floor((dMillis / 1000) % 60)
      const minutes = Math.floor(((dMillis / (60 * 1000)) % 60))
      const hours = Math.floor(((dMillis / (60 * 60 * 1000)) % 24))
      const days = Math.floor(((dMillis / (60 * 60 * 1000)) / 24))

      if(days > 0) {
        out += `${days}:`
        if(hours < 10) out += 0
      }

      if(hours + days > 0) {
        out += `${hours}:`
        if(minutes < 10) out += 0
      }

      if(minutes + hours + days > 0) {
        out += `${minutes}:`
        if(seconds < 10) out += 0
      }

      out += seconds
    }

    return out
  }
}