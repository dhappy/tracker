import { Component, OnInit, Inject, Optional, Input, ViewChild} from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormControl, Validators } from '@angular/forms'
import { ActivityComponent } from '../activity/activity.component'
import { DatabaseService } from '../../services/database.service'
import { Activity } from '../../models/Activity'
import { Router } from '@angular/router'

@Component({
  selector: 'app-activity-configuration',
  templateUrl: './activity-configuration.component.html',
  styleUrls: ['./activity-configuration.component.scss']
})
export class ActivityConfigurationComponent implements OnInit {
  public name:string
  public color:string = '#000000'
  private activity:Activity

  constructor(
    @Optional() public parent:ActivityComponent,
    public db:DatabaseService,
    public router:Router
  ) {}

  ngOnInit() {
    if(this.parent) {
      this.parent.activity.subscribe(
        act => {
          this.activity = act
          this.name = act.name
          this.color = act.color // color picker doesn't update
        }
      )
    }
  }

  editing() {
    return this.activity !== undefined
  }

  process() {
    if(this.editing()) {
      this.update()
    } else {
      this.create()
    }
    this.router.navigate(['/activities'])
  }

  create() {
    let obj = {
      name: this.name,
      color: this.color,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.db.addActivity(obj)
  }

  update() {
    this.activity.name = this.name
    this.activity.color = this.color
    this.db.updateActivity(this.activity)
  }

  keydown(evt) {
    if(evt.keyCode == 13) {
      this.process()
    }
  }
}
