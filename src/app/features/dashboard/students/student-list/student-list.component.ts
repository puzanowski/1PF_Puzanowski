import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllStudents, selectStudentsLoading } from '../../../../store/selectors/student.selectors';
import * as StudentActions from '../../../../store/actions/student.actions';
import { Observable } from 'rxjs';
import { Student } from '../../../../shared/models/student.model';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { StudentsService } from '../../../../shared/services/students.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students$: Observable<Student[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];

  constructor(
    private dialog: MatDialog,
    private studentsService: StudentsService,
    private store: Store<any>
  ) {
    this.students$ = this.store.select(selectAllStudents) as Observable<Student[]>;
    this.loading$ = this.store.select(selectStudentsLoading);
 }

  ngOnInit() {
    this.store.dispatch(StudentActions.loadStudents());
  }

  openDialog(student?: Student): void {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '400px',
      data: { student: student || {}, isNew: !student }
    });

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          if (result.id) {
            this.store.dispatch(StudentActions.updateStudent({ student: result }));
          } else {
            this.store.dispatch(StudentActions.addStudent({ student: result }));
          }
        }
        return of(null);
      })
    ).subscribe();
  }

  deleteStudent(student: Student) {
    if (confirm(`¿Estás seguro de que quieres eliminar a ${student.firstName} ${student.lastName}?`)) {
      this.store.dispatch(StudentActions.deleteStudent({ id: student.id! }));
    }
  }
}
