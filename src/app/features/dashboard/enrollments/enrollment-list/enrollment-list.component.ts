import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Enrollment } from '../../../../shared/models/enrollment.model';
import { EnrollmentDialogComponent } from '../enrollment-dialog/enrollment-dialog.component';
import * as EnrollmentActions from '../../../../store/actions/enrollment.actions';
import * as EnrollmentSelectors from '../../../../store/selectors/enrollment.selectors';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {
  enrollments$: Observable<Enrollment[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'studentName', 'courseName', 'enrollmentDate', 'actions'];

  constructor(
    private dialog: MatDialog,
    private store: Store<any>
  ) {
    this.enrollments$ = this.store.select(EnrollmentSelectors.selectAllEnrollments) as Observable<Enrollment[]>;
    this.loading$ = this.store.select(EnrollmentSelectors.selectEnrollmentsLoading);
  }

  ngOnInit() {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
  }

  openDialog(enrollment?: Enrollment) {
    const dialogRef = this.dialog.open(EnrollmentDialogComponent, {
      width: '400px',
      data: { enrollment: enrollment || {}, isNew: !enrollment }
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
    if (confirm('¿Estás seguro de que quieres eliminar esta asignación?')) {
      this.store.dispatch(EnrollmentActions.deleteEnrollment({ id }));
    }
  }
}
