import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EventListComponent } from './components/event-list/event-list.component'
import { EventListRowComponent } from './components/event-list-row/event-list-row.component'
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
import { MccColorPickerModule } from 'material-community-components'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { ActivityOptionsComponent } from './components/activity-options/activity-options.component'
import { MatListModule } from '@angular/material/list'
import { CovalentDataTableModule } from '@covalent/core/data-table'
import { ActivityDeletionComponent } from './components/activity-deletion/activity-deletion.component'

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventListRowComponent,
    ActivityConfigurationComponent,
    ActivitiesListComponent,
    ActivityOptionsComponent,
    ActivityDeletionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MccColorPickerModule,
    AngularFireAuthModule,
    MatListModule,
    CovalentDataTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ActivityConfigurationComponent, ActivityOptionsComponent],
})
export class AppModule {}
