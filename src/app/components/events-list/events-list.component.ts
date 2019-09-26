import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/Activity'
import { Observable } from 'rxjs'
import { DatabaseService } from '../../services/database.service'
import { Day } from '../../models/Day'
import { map } from 'rxjs/operators'
import * as moment from 'moment'
import { Instance } from '../../models/Instance'

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  public days:Day[]

  constructor(public db:DatabaseService) {}

  ngOnInit() {
    console.info('OnInit', this.db.getEvents())
    this.db.getEvents().subscribe(
      (evts:Instance[]) => {
        this.days = this.groupByDay(evts)
      }
    )
  }

  groupByDay(events:Instance[]):Day[] {
    console.info('gBD', events)

    let byDay = (
      events.reduce((ret:any, event:Instance) => {
        let day = (
          moment(event.time.toMillis())
          .startOf('day')
          .format('dddd, YYYY-MM-DD')
        )
        if(ret[day] === undefined) {
          ret[day] = []
        }
        ret[day].push(event)

        return ret
      }, {})
    )

    let out = []
    for(let date in byDay) {
      out.push({
        displayText: date,
        events: byDay[date],
      })
    }
    return out
  }
}
