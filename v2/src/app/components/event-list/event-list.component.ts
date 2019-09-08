import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.sass']
})
export class EventListComponent implements OnInit {
  events:Event[];

  constructor() { }

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
  }

}
