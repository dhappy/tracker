import { Component, OnInit, Input, Host } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Activity } from '../../models/Activity'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ActivityComponent } from '../activity/activity.component'

@Component({
  selector: 'app-activity-deletion',
  templateUrl: './activity-deletion.component.html',
  styleUrls: ['./activity-deletion.component.scss']
})
export class ActivityDeletionComponent implements OnInit {
  public activity:Observable<Activity>

  constructor(
    @Host() private parent:ActivityComponent
  ) {
  }

  ngOnInit() {
    this.activity = this.parent.activity
    this.activity.subscribe(act => console.info('ACT', act))
  }

  delete() {
    console.log('D', this.activity)
  }
}
