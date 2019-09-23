import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/Activity'
import { Observable } from 'rxjs'
import { DatabaseService } from '../../services/database.service'

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  public days:Observable<Day[]>

  constructor(public db:DatabaseService) {}

  ngOnInit() {
    this.db.getEvents().subscribe(
      (events:Event[]) => {
        this.days.next([new Day()])
      }
    )
  }

}
