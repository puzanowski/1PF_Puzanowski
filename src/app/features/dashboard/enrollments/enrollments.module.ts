import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import { EnrollmentDialogComponent } from './enrollment-dialog/enrollment-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: EnrollmentListComponent,
  },
  {
    path: '**',
    component: EnrollmentListComponent,
  }
];

@NgModule({
  declarations: [
    EnrollmentListComponent,
    EnrollmentDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    EnrollmentListComponent,
    EnrollmentDialogComponent
  ]
})
export class EnrollmentsModule { }
