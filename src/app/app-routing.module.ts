import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ActivityComponent } from './components/activity/activity.component'
import { ActivitiesListComponent } from './components/activities-list/activities-list.component'
import { ActivityConfigurationComponent } from './components/activity-configuration/activity-configuration.component'
import { ActivityDeletionComponent } from './components/activity-deletion/activity-deletion.component'
import { EventsListComponent } from './components/events-list/events-list.component'

const routes:Routes = [
	{
	  path: '',
	  redirectTo: 'activities',
	  pathMatch: 'full'
	},
	{
		path: 'activities',
		data: { crumb: false },
		children:[
			{
				path: '',
				component: ActivitiesListComponent,
				data: { crumb: 'Activities' },
			},
			{
				path: 'new',
				component: ActivityConfigurationComponent,
				data: { crumb: 'New Activity' },
			},
			{
				path: ':id',
				component: ActivityComponent,
				data: { crumb: 'Activity' },
				children: [
					{
						path: '',
						redirectTo: 'edit',
						pathMatch: 'prefix'
					},
					{
						path: 'edit',
	    			component: ActivityConfigurationComponent,
	    		},
	    		{
	    			path: 'delete',
				    component: ActivityDeletionComponent,
	    		}
				]
			},
		]
	},
	{
		path: 'events',
		children:[
			{
				path: '',
				component: EventsListComponent,
			},
		],
	},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
