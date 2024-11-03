import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
        {
                path: 'students',     
                loadChildren: () => import('../../features/dashboard/students/students.module')
                        .then(m => m.StudentsModule)
   
        },
        {
                path: 'courses',     
                loadChildren: () => import('../../features/dashboard/courses/courses.module')
                        .then(m => m.CoursesModule)
   
        },
        {
                path: 'enrollments',     
                loadChildren: () => import('../../features/dashboard/enrollments/enrollments.module')
                        .then(m => m.EnrollmentsModule)
   
        }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}