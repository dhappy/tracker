import { Component, OnInit, Inject, Optional } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import * as moment from 'moment'
import { FormControl, Validators } from '@angular/forms'
import { ActivityComponent } from '../../components/activity/activity.component'
import { FirebaseService } from '../../services/firebase.service'

@Component({
  selector: 'app-activity-configuration',
  templateUrl: './activity-configuration.component.html',
  styleUrls: ['./activity-configuration.component.scss']
})
export class ActivityConfigurationComponent implements OnInit {
  public name:string
  public color:string = this.getRandomColor()

  private container:ActivityComponent

  constructor(
    @Optional() container:ActivityComponent,
    firebase:FirebaseService
  ) {
    this.container = container
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

  getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for(var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
}
