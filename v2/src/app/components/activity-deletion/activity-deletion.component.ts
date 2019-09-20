import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Activity } from '../../models/Activity'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-activity-deletion',
  templateUrl: './activity-deletion.component.html',
  styleUrls: ['./activity-deletion.component.scss']
})
export class ActivityDeletionComponent implements OnInit {
  public activity:Observable<Activity>

  constructor(
    private route:ActivatedRoute,
    private db:AngularFirestore
  ) {
    route.params.subscribe(
      params => {
        this.activity = (
          db.doc<Activity>(
            `activities/${params.activityId}`
          )
          .valueChanges()
          .pipe(map(act => { console.info('ACT', act); return act; }))
        )
      }
    )
  }

  ngOnInit() {
  }

  delete() {
    console.log('D', this.activity)
  }
}
