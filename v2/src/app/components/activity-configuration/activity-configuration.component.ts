import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-activity-configuration',
  templateUrl: './activity-configuration.component.html',
  styleUrls: ['./activity-configuration.component.sass']
})
export class ActivityConfigurationComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<ActivityConfigurationComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit() {
  }

  create() {
  	console.info('Adding new activity');
  	this.dialogRef.close('test');
  }

  cancel() {
  	console.info('Canceled!');
  	this.dialogRef.close();
  }
}
