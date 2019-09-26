import { Component, OnInit, Input, Host } from '@angular/core'
import { Router } from '@angular/router'
import { Activity } from '../../models/Activity'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ActivityComponent } from '../activity/activity.component'
import { AppComponent } from '../../app.component'
import { DatabaseService } from '../../services/database.service'

@Component({
  selector: 'app-activity-deletion',
  templateUrl: './activity-deletion.component.html',
  styleUrls: ['./activity-deletion.component.scss']
})
export class ActivityDeletionComponent implements OnInit {
  public activity:Activity

  constructor(
    @Host() private parent:ActivityComponent,
    public db:DatabaseService,
    public router:Router
  ) {}

  ngOnInit() {
    this.parent.activity.subscribe(
      act => this.activity = act
    )
  }

  delete() {
    console.info('DEL', this.activity)
    this.db.deleteActivity(this.activity)
    this.router.navigate(['/'])
  }
}
