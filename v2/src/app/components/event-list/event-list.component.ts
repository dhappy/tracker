import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.sass']
})
export class EventListComponent implements OnInit {
  events:Event[];

  constructor(private database: DataService) { }

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
  }
}
