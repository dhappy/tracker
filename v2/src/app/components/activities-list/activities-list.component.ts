import { Component, OnInit } from '@angular/core'

import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatFormField } from '@angular/material/form-field'
import { ActivityConfigurationComponent } from '../activity-configuration/activity-configuration.component'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { Activity } from '../../models/Activity'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.sass']
})
export class ActivitiesListComponent implements OnInit {
  public activities:Observable<Activity[]>;

  constructor(
  	private db:AngularFirestore,
  	public dialog:MatDialog
  ) {
    this.activities = (
    	db.collection<Activity>('activities').valueChanges()
    )
  }

  ngOnInit() {
  }

  showNewActivityDialog() {
    const dialogRef = this.dialog.open(
      ActivityConfigurationComponent
    )
	dialogRef.afterClosed().subscribe(
   	  activity => {
   	  	if(activity) {
		    this.db.collection('activities').add(activity)
			.then(function(docRef) {
			    console.debug('New Activity', docRef.id)
			})
			.catch(function(error) {
			    console.error('Error: Adding Activity', error)
			})
		}
   	  }
    )
  }
}
