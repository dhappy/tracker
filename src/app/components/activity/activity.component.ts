import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Activity } from '../../models/Activity'

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  public activity:Activity = new Activity()

  constructor(private route:ActivatedRoute) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    console.info('AId', id)
  }
}
