import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-activity-configuration',
  templateUrl: './activity-configuration.component.html',
  styleUrls: ['./activity-configuration.component.sass']
})
export class ActivityConfigurationComponent implements OnInit {
  public name:string;

  constructor(public dialogRef:MatDialogRef<ActivityConfigurationComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit() {
  }

  create() {
    let obj
    if(this.name && this.name.length > 0) {
      obj = {
        name: this.name,
        color: 'blue'
      }
    }
    console.info('Adding New Activity', obj)

  	this.dialogRef.close(obj)
  }

  cancel() {
  	console.info('Canceled!')
  	this.dialogRef.close()
  }
}
