import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.sass']
})
export class EventListComponent implements OnInit {
	public events:any
  
  ngOnInit() {}
}
