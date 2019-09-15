import { Component, OnInit } from '@angular/core'

import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatFormField } from '@angular/material/form-field'
import { ActivityConfigurationComponent } from '../activity-configuration/activity-configuration.component'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.sass']
})
export class ActivitiesListComponent implements OnInit {
  activities:Observable<any[]>;

  constructor(private db:AngularFirestore, public dialog:MatDialog) {
    this.activities = db.collection('activities').valueChanges()
    console.log('Activities', this.activities)
    this.activities.subscribe((datas) => { console.log("datas", datas) },(err)=>{ console.log("probleme : ", err) });
  }

  ngOnInit() {
  }

  showNewActivityDialog() {
    const dialogRef = this.dialog.open(
      ActivityConfigurationComponent
    );
	dialogRef.afterClosed().subscribe(
   	  activity => {
   	  	console.log('Dialog Output', activity)
   	  	if(activity) {
		    this.db.collection('activities').add(activity)
			.then(function(docRef) {
			    console.debug('New Activity', docRef.id)
			})
			.catch(function(error) {
			    console.error('Error: Adding Activity', error)
			});
		}
   	  }
    );
  }
}
