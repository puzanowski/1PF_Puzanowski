import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from '../../models/student.model';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { StudentsService } from '../../services/students.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    this.studentsService.getStudents().subscribe(
      (students: Student[]) => {
        this.students = students;
      },
      (error: HttpErrorResponse) => {
        console.error('Error cargando estudiantes:', error);
      }
    );
  }

  openDialog(student?: Student) {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '400px',
      data: { student: student || {}, isNew: !student }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.studentsService.updateStudent(result).subscribe(
            () => {
              this.loadStudents();
            },
            (error: HttpErrorResponse) => {
              console.error('Error actualizando estudiante:', error);
            }
          );
        } else {
          this.studentsService.addStudent(result).subscribe(
            () => {
              this.loadStudents();
            },
            (error: HttpErrorResponse) => {
              console.error('Error agregando estudiante:', error);
            }
          );
        }
      }
    });
  }

  deleteStudent(student: Student) {
    if (confirm(`¿Estás seguro de que quieres eliminar a ${student.firstName} ${student.lastName}?`)) {
      this.studentsService.deleteStudent(student.id!).subscribe(
        () => {
          this.loadStudents();
        },
        (error: HttpErrorResponse) => {
          console.error('Error eliminando estudiante:', error);
        }
      );
    }
  }
}