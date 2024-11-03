import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Enrollment } from '../../models/enrollment.model';
import { EnrollmentService } from '../../services/enrollment.service';
import { StudentsService } from '../../services/students.service';
import { CourseService } from '../../services/course.service';
import { EnrollmentDialogComponent } from '../enrollment-dialog/enrollment-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, forkJoin, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {
  enrollments: Enrollment[] = [];
  displayedColumns: string[] = ['id', 'studentName', 'courseName', 'enrollmentDate', 'actions'];

  constructor(
    private dialog: MatDialog,
    private enrollmentService: EnrollmentService,
    private studentsService: StudentsService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadEnrollments();
  }

  loadEnrollments() {
    this.enrollmentService.getEnrollments().pipe(
      tap(enrollments => {
        this.enrollments = enrollments;
      }),
      switchMap(() => forkJoin([
        this.studentsService.getStudents(),
        this.courseService.getCourses()
      ])),
      tap(([students, courses]) => {
        this.enrollments = this.enrollments.map(enrollment => ({
          ...enrollment,
          studentName: `${students.find(s => s.id === enrollment.studentId)?.firstName} ${students.find(s => s.id === enrollment.studentId)?.lastName}`,
          courseName: courses.find(c => c.id === enrollment.courseId)?.name
        }));
      }),
      catchError(error => {
        console.error('Error loading enrollments or related data:', error);
        return of([]);
      })
    ).subscribe();
  }

  openDialog(enrollment?: Enrollment) {
    const dialogRef = this.dialog.open(EnrollmentDialogComponent, {
      width: '400px',
      data: { enrollment: enrollment || {}, isNew: !enrollment }
    });

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          if (result.id) {
            // Editar asignación.
            return of(null);
          } else {
            // Agregar nueva asignación.
            return this.enrollmentService.addEnrollment(result).pipe(
              tap(() => this.loadEnrollments()),
              catchError((error: HttpErrorResponse) => {
                console.error('Error agregando asignación:', error);
                return of(null);
              })
            );
          }
        }
        return of(null);
      })
    ).subscribe();
  }

  deleteEnrollment(enrollment: Enrollment) {
    if (confirm(`¿Estás seguro de que quieres eliminar esta asignación?`)) {
      this.enrollmentService.deleteEnrollment(enrollment.id!).pipe(
        tap(() => this.loadEnrollments()),
        catchError((error: HttpErrorResponse) => {
          console.error('Error eliminando asignación:', error);
          return of(null);
        })
      ).subscribe();
    }
  }
}
