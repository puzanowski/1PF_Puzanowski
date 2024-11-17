import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent,
  },
  {
    path: ':id',
    component: StudentDetailComponent
  },
  {
    path: '**',
    component: StudentListComponent,
  }
];

@NgModule({
  declarations: [
    StudentListComponent,
    StudentDialogComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule
  ],
  exports: [
    StudentListComponent
  ]
})
export class StudentsModule { }
