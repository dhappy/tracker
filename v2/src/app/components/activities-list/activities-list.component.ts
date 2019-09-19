import { Component, OnInit } from '@angular/core'

import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatFormField } from '@angular/material/form-field'
import { ActivityConfigurationComponent } from '../activity-configuration/activity-configuration.component'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { Activity } from '../../models/Activity'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.sass']
})
export class ActivitiesListComponent implements OnInit {
  public activities:Observable<Activity[]>

  constructor(
    private db:AngularFirestore,
    public dialog:MatDialog
  ) {
    this.activities = (
      db.collection<Activity>('activities')
      .valueChanges({ idField: 'id' })
      .pipe(map(activities => activities.map(
        activityObj => new Activity(activityObj)
      )))
    )
  }

  ngOnInit() {
  }

  showNewActivityDialog() {
    const dialogRef = this.dialog.open(
      ActivityConfigurationComponent
    )
    dialogRef.afterClosed().subscribe(
      activity => {
        if(activity) {
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
    )
  }

  createEvent(activity) {
    let now = new Date
    let event = {
      time: now,
      createdAt: now,
      updatedAt: now
    }

    // ToDo: Handle failed writes. Currently the library claims there is no batch method.

    //const batch = this.db.batch()
    const eventsRef = (
      this.db.collection(`activities/${activity.id}/events`)
    )
    const activityRef = (
      this.db.collection('activities').doc(activity.id)
    )

    eventsRef.add(event)
    activityRef.update({ lastEventAt: now })

    /*
    batch.add(eventsRef, event)
    batch.update(activityRef, { lastEventAt: now })
    batch.commit
    .then(() => console.info('Batched Write'))
    .catch(() => console.error('Batched Write Error'))
    */
  }

  options(activity) {
    console.log(arguments)
    return false
  }
}
