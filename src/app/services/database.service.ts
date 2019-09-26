import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { DocumentChangeAction } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { Activity } from '../models/Activity'
import { Instance } from '../models/Instance'
import { map } from 'rxjs/operators'
import { of, combineLatest } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable()
export class DatabaseService implements OnDestroy {
  public _userId:string
  public prefix:string = ''

  public constructor(
    public db:AngularFirestore,
    public as:AngularFireAuth
  ) {
    this.user = as.auth.currentUser
  }

  ngOnDestroy() {
    // release events subscriptions
  }

  set user(user) {
    if(user) {
      this.userId = user.uid
    } else {
      this.userId = ''
    }
  }

  set userId(id) {
    this._userId = id
    if(id && id.length > 0) {
      this.prefix = `/users/${id}`
    } else {
      this.userId = 'public_user'
    }
  }

  public getActivity(id:string):Observable<Activity> {
    return (
      this.db
      .doc<Activity>(`${this.prefix}/activities/${id}`)
      .valueChanges()
    )
  }

  public get<T>(path:string):Observable<T> {
    return this.db.doc<T>(path).valueChanges()
  }

  public addActivity(activity) {
    if(activity) {
      activity.lastEventAt = null // not returned in an ordered query if unset

      this.db.collection(`${this.prefix}/activities`)
      .add(activity)
      .catch(error => console.error('Error Adding Activity', error))
    }
  }

  public deleteActivity(activity:Activity) {
    console.info('DEL', activity.id)
  }

  public updateActivity(activity:Activity) {
    console.info('UP', activity)
  }

  public getActivities():Observable<Activity[]> {
    return this.db.collection<Activity>(
      `${this.prefix}/activities`,
      ref => ref.orderBy('lastEventAt', 'desc')
    )
    .valueChanges({ idField: 'id' })
  }

  public addEvent(activity, event) {
    event.parentId = activity.id // There is no way to get the parent of a document on a collectionGroup

    // ToDo: Handle failed writes. Currently the library claims there is no batch method.

    //const batch = this.db.batch()
    const eventsRef = (
      this.db.collection(
        `${this.prefix}/activities/${activity.id}/events`
      )
    )
    const activityRef = (
      this.db
      .collection(`${this.prefix}/activities`)
      .doc(activity.id)
    )

    eventsRef.add(event)
    activityRef.update({ lastEventAt: event.time })

    /*
    batch.add(eventsRef, event)
    batch.update(activityRef, { lastEventAt: now })
    batch.commit
    .then(() => console.info('Batched Write'))
    .catch(() => console.error('Batched Write Error'))
    */
  }

  public getEventsFor(activity:Activity):Observable<Instance[]> {
    let path = (
      `${this.prefix}/activities/${activity.id}/events`
    )
    return (
      this.db.collection<Instance>(path).valueChanges()
    )
  }                               

  public getEvents(activity?:Activity):Observable<Instance[]> {
    return new Observable<Instance[]>(
      subscriber => {
        this.getActivities().subscribe(
          (acts:Activity[]) => {
            let eventLists:Observable<Instance[]>[] = (
              acts.map((act:Activity) => {
                return (
                  this.getEventsFor(act)
                  .pipe(map((evts:Instance[]) => {
                    return evts.map((evt:Instance) => {
                      let inst = new Instance(evt)
                      inst.name = act.name
                      inst.color = act.color
                      return inst
                    })
                  }))
                )
              })
            )

            let combined = combineLatest(...eventLists)

            combined.subscribe(
              (evts:Instance[][]) => {
                let list = (
                  evts.flat().sort(Instance.compareByTime)
                )
                subscriber.next(list)
              }
            )
          }
        )
      }
    )
  }
}