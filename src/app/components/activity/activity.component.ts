import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Activity } from '../../models/Activity'
import { Observable } from 'rxjs'
import { DatabaseService } from '../../services/database.service'

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  public activity:Observable<Activity>

  constructor(
    private route:ActivatedRoute,
    public db:DatabaseService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')

    this.activity = this.db.getActivity(id)
  }
}
