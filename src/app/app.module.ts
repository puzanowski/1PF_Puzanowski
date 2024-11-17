import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HeaderDirective } from './shared/directives/header.directive';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { studentReducer } from './store/reducers/student.reducer';
import { StudentEffects } from './store/effects/student.effects';
import { courseReducer } from './store/reducers/course.reducer';
import { CourseEffects } from './store/effects/course.effects';
import { enrollmentReducer } from './store/reducers/enrollment.reducer';
import { EnrollmentEffects } from './store/effects/enrollment.effects';
import { UserEffects } from './store/effects/user.effects';
import { userReducer } from './store/reducers/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DatePipe,    
    AppRoutingModule,
    DashboardModule,
    StoreModule.forRoot({
      students: studentReducer,
      courses: courseReducer,
      enrollments: enrollmentReducer,
      users: userReducer
    }),
    EffectsModule.forRoot([StudentEffects, CourseEffects, EnrollmentEffects, UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }