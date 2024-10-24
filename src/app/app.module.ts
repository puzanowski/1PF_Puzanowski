import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HeaderDirective } from '../directives/header.directive';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseListComponent } from './components/course-list/course-list.component';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import { EnrollmentListComponent } from './components/enrollment-list/enrollment-list.component';
import { DatePipe } from '@angular/common';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToolbarComponent,
    StudentListComponent,
    StudentFormComponent,
    FullNamePipe,
    HeaderDirective,
    StudentDialogComponent,
    CourseListComponent,
    EnrollmentDialogComponent,
    EnrollmentListComponent,
    CourseDialogComponent,
    DashboardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe,
    RouterModule.forRoot([
      { path: 'students', component: StudentListComponent },
      { path: 'courses', component: CourseListComponent },
      { path: 'enrollments', component: EnrollmentListComponent },
      { path: '', redirectTo: '/students', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }