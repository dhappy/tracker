import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
/*
	{
	    path: '',
	    component: CategoriesComponent,
		  resolve: {
		    data: CategoriesResolver
			}
	},
	{
	    path: 'questions/about/:categorySlug',
	    component: CategoryQuestionsComponent,
	    resolve: {
	      data: CategoryQuestionsResolver
	  	}
	},
	{
	    path: 'question/:questionSlug',
	    component: QuestionAnswersComponent,
	    resolve: {
	      data: QuestionAnswersResolver
	  	}
	}
*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
