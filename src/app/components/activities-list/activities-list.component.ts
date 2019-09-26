import { Component, OnInit, Host } from '@angular/core'

import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatFormField } from '@angular/material/form-field'
import { ActivityConfigurationComponent } from '../activity-configuration/activity-configuration.component'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { Activity } from '../../models/Activity'
import { map } from 'rxjs/operators'
import { ActivityOptionsComponent } from '../activity-options/activity-options.component'
import { DatabaseService } from '../../services/database.service'
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  public activities:Observable<Activity[]>
  private intervalId:number

  constructor(
    private db:DatabaseService,
    public dialog:MatDialog
  ) {}

  ngOnInit() {
    this.activities = (
      this.db.getActivities()
      .pipe(map(acts => {
        let updateDeltas = () => {
          acts.forEach(act =>
            act.timeDelta = Activity.deltaCounter(
              act.lastEventAt
            )
          )
        }

        clearInterval(this.intervalId)
        this.intervalId = setInterval(
          updateDeltas, 1000
        )

        updateDeltas()

        return acts
      }))
    )
  }

  createEvent(activity) {
    let now = new Date
    let event = {
      time: now,
      createdAt: now,
      updatedAt: now
    }

    this.db.addEvent(activity, event)
  }

  options(activity) {
    const dialogRef = this.dialog.open(
      ActivityOptionsComponent,
      { data: activity }
    )
  }
}
