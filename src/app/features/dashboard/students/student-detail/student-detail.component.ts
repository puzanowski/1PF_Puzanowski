import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, map, finalize, tap, combineLatest } from 'rxjs';
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
export class StudentDetailComponent implements OnInit {
  student: Student | null = null;
  enrollments: Enrollment[] = [];
  loading = false;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private enrollmentService: EnrollmentService,
    private store: Store<{ enrollments: { enrollments: Enrollment[], loading: boolean } }>,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => this.studentsService.getStudentById(Number(params['id']))),
      tap(student => this.student = student),
      switchMap(student => {
        this.loading = true;
        return this.enrollmentService.getEnrollmentsByStudentId(student.id!).pipe(
          finalize(() => this.loading = false)
        );
      })
    ).subscribe(enrollments => {
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
} 