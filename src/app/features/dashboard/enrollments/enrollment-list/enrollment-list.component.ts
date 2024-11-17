import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { tap, switchMap, combineLatest, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { EnrollmentDisplay } from '@shared/models/enrollment.model';
import { AuthService } from '@core/services/auth.service';
import * as EnrollmentActions from '@store/actions/enrollment.actions';
import { EnrollmentState } from '@store/reducers/enrollment.reducer';
import { selectAllEnrollments, selectEnrollmentsLoading } from '@store/selectors/enrollment.selectors';
import { EnrollmentDialogComponent } from '../enrollment-dialog/enrollment-dialog.component';
import { StudentsService } from '@shared/services/students.service';
import { CourseService } from '@shared/services/course.service';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'studentName', 'courseName', 'enrollmentDate'];
  dataSource = new MatTableDataSource<EnrollmentDisplay>();
  loading$ = this.store.select(selectEnrollmentsLoading);
  isAdmin = false;
  private subscription: Subscription | undefined;

  constructor(
    private store: Store<{ enrollments: EnrollmentState }>,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
    if (this.isAdmin) {
      this.displayedColumns.push('actions');
    }
  }

  ngOnInit() {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
    
    this.subscription = this.store.select(selectAllEnrollments)
      .subscribe(enrollments => {
        console.log('Enrollments:', enrollments);
        const normalizedEnrollments: EnrollmentDisplay[] = enrollments.map(enrollment => ({
          ...enrollment,
          studentName: enrollment.student 
            ? `${enrollment.student.firstName} ${enrollment.student.lastName}`
            : `ID: ${enrollment.studentId}`,
          courseName: enrollment.course?.name || `ID: ${enrollment.courseId}`
        }));
        this.dataSource.data = normalizedEnrollments;
      });
  }

  openDialog(enrollment?: EnrollmentDisplay) {
    const dialogRef = this.dialog.open(EnrollmentDialogComponent, {
      width: '400px',
      data: {
        enrollment: enrollment ? {
          id: enrollment.id,
          studentId: enrollment.studentId,
          courseId: enrollment.courseId,
          enrollmentDate: enrollment.enrollmentDate
        } : {},
        isNew: !enrollment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.store.dispatch(EnrollmentActions.updateEnrollment({ enrollment: result }));
        } else {
          this.store.dispatch(EnrollmentActions.addEnrollment({ enrollment: result }));
        }
      }
    });
  }

  deleteEnrollment(id: number) {
    this.store.dispatch(EnrollmentActions.deleteEnrollment({ id }));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
