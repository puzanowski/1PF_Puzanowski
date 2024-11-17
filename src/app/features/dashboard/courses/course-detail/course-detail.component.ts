import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, map, finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../../../shared/models/course.model';
import { Enrollment } from '../../../../shared/models/enrollment.model';
import { CourseService } from '../../../../shared/services/course.service';
import { EnrollmentService } from '../../../../shared/services/enrollment.service';
import { Store } from '@ngrx/store';
import * as EnrollmentActions from '../../../../store/actions/enrollment.actions';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  enrollments: Enrollment[] = [];
  loading = false;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CourseService,
    private enrollmentService: EnrollmentService,
    private store: Store,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => this.coursesService.getCourseById(Number(params['id'])))
    ).subscribe(course => {
      this.course = course;
      this.loadEnrollments();
    });
  }

  loadEnrollments() {
    if (this.course?.id) {
      this.loading = true;
      this.enrollmentService.getEnrollments().pipe(
        map(enrollments => enrollments.filter(e => e.courseId === this.course?.id)),
        finalize(() => this.loading = false)
      ).subscribe(enrollments => {
        this.enrollments = enrollments;
      });
    }
  }

  unenroll(enrollmentId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar desmatriculación',
        message: '¿Estás seguro de que deseas desmatricular este alumno del curso?',
        onConfirm: () => {
          this.store.dispatch(EnrollmentActions.deleteEnrollment({ id: enrollmentId }));
          this.loadEnrollments();
        }
      }
    });
  }
} 