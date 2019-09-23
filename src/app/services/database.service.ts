import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { Activity } from '../models/Activity'

@Injectable()
export class DatabaseService {
  public constructor(public db:AngularFirestore) {}

  public getActivity(id):Observable<Activity> {
    console.info('AId', id)

    return null
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

  public listActivities():Observable<Activity[]> {
    return this.db.collection<Activity>(
      'activities',
      ref => ref.orderBy('lastEventAt', 'desc')
    )
    .valueChanges({ idField: 'id' })
  }

  public addEvent(activity, event) {
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
}