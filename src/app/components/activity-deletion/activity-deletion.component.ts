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
  public activity:Observable<Activity>

  constructor(
    @Host() private parent:ActivityComponent,
    @Host() private app:AppComponent,
    public db:DatabaseService,
    public router:Router
  ) {}

  ngOnInit() {
    this.activity = this.parent.activity

    this.app.crumbs.push(
      { link: 'delete', text: 'Delete' }
    )
  }

  delete() {
    this.activity.subscribe(
      act => this.db.deleteActivity(act)
    )
    this.router.navigate(['/'])
  }
}
