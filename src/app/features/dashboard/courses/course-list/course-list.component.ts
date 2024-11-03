import { Component, OnInit } from '@angular/core';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../../../shared/models/course.model';
import { CourseService } from '../../../../shared/services/course.service';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'quantity', 'assignedProfessor', 'actions'];

  constructor(
    private dialog: MatDialog,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().pipe(
      tap((courses: Course[]) => {
        this.courses = courses;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error cargando cursos:', error);
        return of([]);
      })
    ).subscribe();
  }

  openDialog(course?: Course) {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '400px',
      data: { course: course || {}, isNew: !course }
    });
  
    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          if (result.id) {
            // Editar curso.
            return this.courseService.updateCourse(result).pipe(
              tap(() => this.loadCourses()),
              catchError(error => {
                console.error('Error actualizando curso: ', error);
                return of(null);
              })
            );
          } else {
            // Agregar nuevo curso.
            return this.courseService.addCourse(result).pipe(
              tap(() => this.loadCourses()),
              catchError(error => {
                console.error('Error creando curso: ', error);
                return of(null);
              })
            );
          }
        }
        return of(null);
      })
    ).subscribe();
  }

  deleteCourse(course: Course) {
    if (confirm(`¿Estás seguro de que quieres eliminar el curso ${course.name}?`)) {
      this.courseService.deleteCourse(course.id!).pipe(
        tap(() => this.loadCourses()),
        catchError((error) => {
          console.error('Error eliminando curso: ', error);
          return of(null);
        })
      ).subscribe();
    }
  }
}