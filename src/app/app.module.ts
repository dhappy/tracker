import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material'
import { ActivityConfigurationComponent } from './components/activity-configuration/activity-configuration.component'
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { ActivitiesListComponent } from './components/activities-list/activities-list.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { ActivityOptionsComponent } from './components/activity-options/activity-options.component'
import { MatListModule } from '@angular/material/list'
import { ActivityDeletionComponent } from './components/activity-deletion/activity-deletion.component';
import { ActivityComponent } from './components/activity/activity.component'
import { DatabaseService } from './services/database.service'
import { EventsListComponent } from './components/events-list/events-list.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component'
import { MarkdownModule } from 'ngx-markdown'
import { AngularFireMessagingModule } from '@angular/fire/messaging'
import { ColorPickerModule } from 'ngx-color-picker';
import { GoalConfigurationComponent } from './components/goal-configuration/goal-configuration.component'

@NgModule({
  declarations: [
    AppComponent,
    ActivityConfigurationComponent,
    ActivitiesListComponent,
    ActivityOptionsComponent,
    ActivityDeletionComponent,
    ActivityComponent,
    EventsListComponent,
    BreadcrumbsComponent,
    GoalConfigurationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('msg+cache-worker.js', { enabled: environment.production }),
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MarkdownModule.forRoot(),
    AngularFireMessagingModule,
    ColorPickerModule,
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
  entryComponents: [ActivityOptionsComponent],
})
export class AppModule {}
