import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonSearchComponent } from './lesson-search/lesson-search.component';
import { MessagesComponent } from './messages/messages.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { LoadingComponent } from './loading/loading.component';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //   dataEncapsulation: false,
    // }),
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    LessonsComponent,
    LessonDetailComponent,
    MessagesComponent,
    LessonSearchComponent,
    StudentListComponent,
    StudentDetailComponent,
    LoadingComponent,
  ],
  bootstrap: [AppComponent],
  providers: [httpInterceptorProviders],
})
export class AppModule {}
