import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent,
  },
  {
    path: '**',
    component: StudentListComponent,
  }
];

@NgModule({
  declarations: [
    StudentListComponent,
    StudentDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    StudentListComponent
  ]
})
export class StudentsModule { }
