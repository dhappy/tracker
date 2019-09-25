import * as firebase from 'firebase/app'
type Timestamp = firebase.firestore.Timestamp
import * as moment from 'moment'
import { Observable } from 'rxjs'
import { DatabaseService } from '../services/database.service'
import { map } from 'rxjs/operators'

//export class Event { // Conflicts with default global deinition
export class Instance {
  public id:string
  public _time:Timestamp
  public displayTime:string
  public parentId:string
  public name:string
  public color:string

  constructor(base?:any) {
    Object.assign(this, base)
  }

  get time() {
    return this._time
  }

  set time(time) {
    if(time) {
      this._time = time
      this.displayTime = (
        moment(this.time.toDate())
        .format('HH:mm:ss')
      )
    }
  }
}