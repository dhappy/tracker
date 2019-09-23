import * as firebase from 'firebase/app'
//import Timestamp = firebase.firestore.Timestamp // fails in production
type Timestamp = firebase.firestore.Timestamp

export class Activity {
  public id:string
  public type:string = 'activity'
  public name:string
  public color:string
  public lastEventAt:Timestamp
  public timeDelta:string

  constructor(base?:any) {
    Object.assign(this, base)

    this.updateTimeDelta()
  }

  public updateTimeDelta():void {
    this.timeDelta = (
      Activity.deltaCounter(this.lastEventAt)
    )
  }

  public static deltaCounter(epoch, now?) {
    let out = ''

    if(epoch) {
      if(!now) now = new Date()

      const dMillis = now.getTime() - epoch.toMillis()
      const seconds = Math.floor((dMillis / 1000) % 60)
      const minutes = Math.floor(((dMillis / (60 * 1000)) % 60))
      const hours = Math.floor(((dMillis / (60 * 60 * 1000)) % 24))
      const days = Math.floor(((dMillis / (60 * 60 * 1000)) / 24))

      if(days > 0) {
        out += `${days}ᴅ`
        if(hours < 10) out += 0
      }

      if(hours + days > 0) {
        out += `${hours}ʜ`
        if(minutes < 10) out += 0
      }

      if(minutes + hours + days > 0) {
        out += `${minutes}`

        if(days == 0) {
          out += ':'
          if(seconds < 10) out += 0
        }
      }

      if(days == 0) {
        out += seconds
      }
    }

    return out
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for(var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

}