import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Activity } from '../../models/Activity'

@Component({
  selector: 'app-activity-options',
  templateUrl: './activity-options.component.html',
  styleUrls: ['./activity-options.component.scss']
})
export class ActivityOptionsComponent implements OnInit {
  constructor(
    public dialogRef:
    MatDialogRef<ActivityOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public activity:Activity
  ) {}

  ngOnInit() {}

  cancel() {
    this.dialogRef.close()
  }

  delete() {
    this.dialogRef.close()
  }
}
