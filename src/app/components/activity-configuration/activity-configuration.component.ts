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

  private container:ActivityComponent

  constructor(
    @Optional() container:ActivityComponent,
    public db:DatabaseService
  ) {
    this.container = container // necessary?
  }

  ngOnInit() {
    if(this.container) {
      console.info('P2', this.container.activity)//, this.parent.activity)
    }
  }

  create() {
    let obj = {
      name: this.name,
      color: this.color,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    console.info('Adding New Activity', obj)
  }

  keydown(evt) {
    if(evt.keyCode == 13) {
      this.create()
    }
  }
}
