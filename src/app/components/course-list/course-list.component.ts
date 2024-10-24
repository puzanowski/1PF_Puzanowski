import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
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
  ) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(
      (courses: Course[]) => {
        this.courses = courses;
      },
      (error: HttpErrorResponse) => {
        console.error('Error cargando cursos:', error);
      }
    );
  }

  openDialog(course?: Course) {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '400px',
      data: { course: course || {}, isNew: !course }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.courseService.updateCourse(result).subscribe(
            () => {
              this.loadCourses();
            },
            (error) => {
              console.error('Error actualizando curso: ', error);
            }
          );
        } else {
          this.courseService.addCourse(result).subscribe(
            () => {
              this.loadCourses();
            },
            (error) => {
              console.error('Error creando curso: ', error);
            }
          );
        }
      }
    });
  }

  deleteCourse(course: Course) {
    if (confirm(`¿Estás seguro de que quieres eliminar el curso ${course.name}?`)) {
      this.courseService.deleteCourse(course.id!).subscribe(
        () => {
          this.loadCourses();
        },
        (error) => {
          console.error('Error eliminando curso: ', error);
        }
      );
    }
  }
}