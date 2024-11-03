import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from '../../models/student.model';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { StudentsService } from '../../services/students.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];

  constructor(
    private dialog: MatDialog,
    private studentsService: StudentsService
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentsService.getStudents().pipe(
      tap((students: Student[]) => {
        this.students = students;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error cargando estudiantes:', error);
        return of([]);
      })
    ).subscribe();
  }

  openDialog(student?: Student) {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '400px',
      data: { student: student || {}, isNew: !student }
    });

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          if (result.id) {
            // Actualizar estudiante
            return this.studentsService.updateStudent(result).pipe(
              tap(() => this.loadStudents()),
              catchError((error: HttpErrorResponse) => {
                console.error('Error actualizando estudiante:', error);
                return of(null);
              })
            );
          } else {
            // Agregar nuevo estudiante
            return this.studentsService.addStudent(result).pipe(
              tap(() => this.loadStudents()),
              catchError((error: HttpErrorResponse) => {
                console.error('Error agregando estudiante:', error);
                return of(null);
              })
            );
          }
        }
        return of(null);
      })
    ).subscribe();
  }

  deleteStudent(student: Student) {
    if (confirm(`¿Estás seguro de que quieres eliminar a ${student.firstName} ${student.lastName}?`)) {
      this.studentsService.deleteStudent(student.id!).pipe(
        tap(() => this.loadStudents()),
        catchError((error: HttpErrorResponse) => {
          console.error('Error eliminando estudiante:', error);
          return of(null);
        })
      ).subscribe();
    }
  }
}
