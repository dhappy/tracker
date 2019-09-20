import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ActivitiesListComponent } from './components/activities-list/activities-list.component'
import { ActivityConfigurationComponent } from './components/activity-configuration/activity-configuration.component'
import { ActivityDeletionComponent } from './components/activity-deletion/activity-deletion.component'

const routes:Routes = [
	{
	    path: '',
	    component: ActivitiesListComponent,
		  resolve: {
		    //data: CategoriesResolver
			}
	},
	// There is a nested syntax that's prettier
	// https://angular.io/guide/router#resolve-guard
	{
	    path: 'activities/:activityId/edit',
	    component: ActivityConfigurationComponent,
	    resolve: {
	      //data: CategoryQuestionsResolver
	  	}
	},
	{
	    path: 'activities/:activityId/delete',
	    component: ActivityDeletionComponent,
	    resolve: {
	      //data: CategoryQuestionsResolver
	  	}
	},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
