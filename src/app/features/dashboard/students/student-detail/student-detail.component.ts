import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, map, finalize, tap, combineLatest, Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Student } from '../../../../shared/models/student.model';
import { Enrollment } from '../../../../shared/models/enrollment.model';
import { StudentsService } from '../../../../shared/services/students.service';
import { EnrollmentService } from '../../../../shared/services/enrollment.service';
import { Store } from '@ngrx/store';
import * as EnrollmentActions from '../../../../store/actions/enrollment.actions';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit, OnDestroy {
  student: Student | null = null;
  enrollments: Enrollment[] = [];
  loading = false;
  isAdmin = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private enrollmentService: EnrollmentService,
    private store: Store,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit() {
    this.loadStudentData();
    // Suscribirse a los cambios en el store de enrollments
    this.store.select((state: any) => state.enrollments)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.student?.id) {
          this.loadEnrollments(this.student.id);
        }
      });
  }

  private loadStudentData() {
    this.route.params.pipe(
      switchMap(params => this.studentsService.getStudentById(Number(params['id']))),
      tap(student => {
        this.student = student;
        if (student?.id) {
          this.loadEnrollments(student.id);
        }
      })
    ).subscribe();
  }

  private loadEnrollments(studentId: number) {
    this.loading = true;
    this.enrollmentService.getEnrollmentsByStudentId(studentId)
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
        message: '¿Estás seguro de que deseas desmatricular al alumno de este curso?',
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