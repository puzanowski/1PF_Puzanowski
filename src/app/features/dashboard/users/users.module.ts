import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: '**',
    component: UserListComponent,
  }
];

@NgModule({
  declarations: [
    UserListComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { } 