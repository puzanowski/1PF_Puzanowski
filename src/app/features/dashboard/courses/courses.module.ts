import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
  },
  {
    path: '**',
    component: CourseListComponent,
  }
];

@NgModule({
  declarations: [
    CourseListComponent,
    CourseDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    CourseListComponent,
    CourseDialogComponent
  ]
})
export class CoursesModule { }
