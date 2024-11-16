import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from '../../core/guards/auth.guard';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
              path: 'students',
              loadChildren: () => import('./students/students.module')
                      .then(m => m.StudentsModule)
 
      },
      {
              path: 'users',
              canActivate: [adminGuard],
              loadChildren: () => import('./users/users.module')
                      .then(m => m.UsersModule)
 
      },
        {
                path: 'courses',     
                loadChildren: () => import('./courses/courses.module')
                        .then(m => m.CoursesModule)
   
        },
        {
                path: 'enrollments',     
                loadChildren: () => import('./enrollments/enrollments.module')
                        .then(m => m.EnrollmentsModule)
   
        },
        {
          path: '**',
          redirectTo: 'courses'
        }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}