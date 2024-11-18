import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, map, finalize, tap, combineLatest, Subject, takeUntil } from 'rxjs';
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
export class CourseDetailComponent implements OnInit, OnDestroy {
  course: Course | null = null;
  enrollments: Enrollment[] = [];
  loading = false;
  isAdmin = false;
  private destroy$ = new Subject<void>();

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
    this.loadCourseData();
    
    this.store.select((state: any) => state.enrollments)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.course?.id) {
          this.loadEnrollments(this.course.id);
        }
      });
  }

  private loadCourseData() {
    this.route.params.pipe(
      switchMap(params => this.coursesService.getCourseById(Number(params['id']))),
      tap(course => {
        this.course = course;
        if (course?.id) {
          this.loadEnrollments(course.id);
        }
      })
    ).subscribe();
  }

  private loadEnrollments(courseId: number) {
    this.loading = true;
    this.enrollmentService.getEnrollmentsByCourseId(courseId)
      .pipe(finalize(() => this.loading = false))
      .subscribe(enrollments => {
        this.enrollments = enrollments;
      });
  }

  unenroll(enrollmentId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar desmatriculación',
        message: '¿Estás seguro de que deseas desmatricular este alumno del curso?',
        onConfirm: () => {
          this.store.dispatch(EnrollmentActions.deleteEnrollment({ id: enrollmentId }));
        }
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
} 