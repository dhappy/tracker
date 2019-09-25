import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { Activity } from '../models/Activity'
import { Instance } from '../models/Instance'
import { map } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable()
export class DatabaseService {
  public constructor(public db:AngularFirestore) {}

  public getActivity(id):Observable<Activity> {
    console.info('AId', id)

    return null
  }

  public get(path:string):Observable<any> {
    return this.db.doc(path).valueChanges()
  }

  public addActivity(activity) {
    if(activity) {
      activity.lastEventAt = null // not returned in an ordered query if unset
      this.db.collection('activities')
      .add(activity)
      .then(function(docRef) {
        console.debug('New Activity', docRef.id)
      })
      .catch(function(error) {
        console.error('Error: Adding Activity', error)
      })
    }
  }

  public deleteActivity(id) {}

  public updateActivity(obj) {}

  public getActivities():Observable<Activity[]> {
    return this.db.collection<Activity>(
      'activities',
      ref => ref.orderBy('lastEventAt', 'desc')
    )
    .valueChanges({ idField: 'id' })
  }

  public addEvent(activity, event) {
    event.parentId = activity.id // There is no way to get the parent of a document on a collectionGroup

    // ToDo: Handle failed writes. Currently the library claims there is no batch method.

    //const batch = this.db.batch()
    const eventsRef = (
      this.db.collection(`activities/${activity.id}/events`)
    )
    const activityRef = (
      this.db.collection('activities').doc(activity.id)
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

  public getEvents():Observable<Instance[]> {
    return (
      this.db
      .collectionGroup<Instance>(
        'events',
        ref => ref.orderBy('time', 'desc')
      )
      .snapshotChanges()
      .pipe(map(changes => {
        let klass = this

        return changes.map(cng => {
          let doc = cng.payload.doc
          let inst = new Instance(doc.data())

          inst.parentId = doc.ref.parent.parent.path

          klass.db.doc<Activity>(inst.parentId)
          .valueChanges().subscribe(
            doc => {
              inst.name = doc.name
              inst.color = doc.color
            }
          )

          return inst
        })
      }))
    )
  }
}