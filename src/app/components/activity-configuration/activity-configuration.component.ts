import { Component, OnInit, Inject, Optional, Input } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormControl, Validators } from '@angular/forms'
import { ActivityComponent } from '../activity/activity.component'
import { DatabaseService } from '../../services/database.service'
import { Activity } from '../../models/Activity'

@Component({
  selector: 'app-activity-configuration',
  templateUrl: './activity-configuration.component.html',
  styleUrls: ['./activity-configuration.component.scss']
})
export class ActivityConfigurationComponent implements OnInit {
  public name:string
  public color:string

  constructor(
    @Optional() public parent:ActivityComponent,
    public db:DatabaseService
  ) {}

  ngOnInit() {
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

  keydown(evt) {
    if(evt.keyCode == 13) {
      this.create()
    }
  }
}
