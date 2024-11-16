import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllStudents, selectStudentsLoading } from '../../../../store/selectors/student.selectors';
import * as StudentActions from '../../../../store/actions/student.actions';
import { Observable } from 'rxjs';
import { Student } from '../../../../shared/models/student.model';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { StudentsService } from '../../../../shared/services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students$: Observable<Student[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'fullName', 'email'];
  isAdmin: boolean = false;

  constructor(
    private dialog: MatDialog,
    private studentsService: StudentsService,
    private store: Store<any>,
    private authService: AuthService
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
    
    if (confirm(`¿Estás seguro de que quieres eliminar a ${student.firstName} ${student.lastName}?`)) {
      this.store.dispatch(StudentActions.deleteStudent({ id: student.id! }));
    }
  }
}
