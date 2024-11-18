import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllStudents, selectStudentsLoading } from '../../../../store/selectors/student.selectors';
import * as StudentActions from '../../../../store/actions/student.actions';
import { Observable } from 'rxjs';
import { Student } from '../../../../shared/models/student.model';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { StudentsService } from '../../../../shared/services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@core/services/auth.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students$: Observable<Student[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'fullName', 'email', 'details'];
  isAdmin: boolean = false;

  constructor(
    private dialog: MatDialog,
    private store: Store<any>,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.students$ = this.store.select(selectAllStudents) as Observable<Student[]>;
    this.loading$ = this.store.select(selectStudentsLoading);
    this.isAdmin = this.authService.currentUser?.role === 'admin';
    
    if (this.isAdmin) {
      this.displayedColumns.push('actions');
    }
  }

  ngOnInit() {
    this.store.dispatch(StudentActions.loadStudents());
  }

  openDialog(student?: Student): void {
    if (!this.isAdmin) return;

    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '400px',
      data: { student: student || {}, isNew: !student }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.store.dispatch(StudentActions.updateStudent({ student: result }));
        } else {
          this.store.dispatch(StudentActions.addStudent({ student: result }));
        }
      }
    });
  }

  deleteStudent(student: Student) {
    if (!this.isAdmin) return;
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de que quieres eliminar a ${student.firstName} ${student.lastName}?`,
        onConfirm: () => {
          this.store.dispatch(StudentActions.deleteStudent({ id: student.id! }));
          this.snackBar.open(
            'El alumno fue eliminado correctamente',
            'Cerrar',
            {
              duration: 3000,
              panelClass: ['success-snackbar'],
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        }
      }
    });
  }
}
