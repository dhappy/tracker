import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { DataService } from '../../services/data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { ActivityConfigurationComponent } from '../activity-configuration/activity-configuration.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.sass']
})
export class EventListComponent implements OnInit {
  events:Event[];

  constructor(private database: DataService, public dialog: MatDialog) { }

  ngOnInit() {
  	this.events = [
  		{
  			_id: '1',
  			time: '2019-01-01'
  		},
  		{
  			_id: '2',
  			time: '2019-01-01'
  		},
  		{
  			_id: '3',
  			time: '2019-01-01'
  		}
  	];

  	this.database.post({
  		title: 'Test'
  	})
  	.then(result => {
	  console.log(result);
	});

	this.database.fetch().then(result => {
	  console.log(result);
      this.events = [];
      for(let i = 0; i < result.rows.length; i++) {
        this.events.push(result.rows[i].doc);
      }
    }, error => {
      console.error(error);
    });

	let query = { selector: { title: 'Test' } }

	this.database.find(query).then(result => {
	  console.log(result);
      for(let i = 0; i < result.docs.length; i++) {
        this.events.push(result.docs[i]);
      }
    }, error => {
      console.error(error);
    });
  }

  showNewActivityDialog() {
    let dialogRef = this.dialog.open(ActivityConfigurationComponent);
  	console.log('h');
  }
}
