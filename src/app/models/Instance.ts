import * as firebase from 'firebase/app'
type Timestamp = firebase.firestore.Timestamp
import * as moment from 'moment'
import { Observable } from 'rxjs'
import { DatabaseService } from '../services/database.service'
import { map } from 'rxjs/operators'

//export class Event { // Conflicts with default global deinition
export class Instance {
  public id:string
  public time:Timestamp
  public displayTime:string
  public parentId:string

  constructor(base?:any) {
    Object.assign(this, base)

    if(this.time) {
      this.displayTime = (
        moment(this.time.toDate())
        .format('HH:mm:ss')
      )
    }
  }
}