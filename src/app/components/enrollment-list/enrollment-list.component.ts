import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Enrollment } from '../../models/enrollment.model';
import { EnrollmentService } from '../../services/enrollment.service';
import { StudentsService } from '../../services/students.service';
import { CourseService } from '../../services/course.service';
import { EnrollmentDialogComponent } from '../enrollment-dialog/enrollment-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {
  enrollments: Enrollment[] = [];
  displayedColumns: string[] = ['id', 'studentName', 'courseName', 'enrollmentDate', 'actions'];

  constructor(
    private dialog: MatDialog,
    private enrollmentService: EnrollmentService,
    private studentsService: StudentsService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadEnrollments();
  }

  loadEnrollments() {
    this.enrollmentService.getEnrollments().subscribe(
      (enrollments) => {
        this.enrollments = enrollments;
        this.loadStudentAndCourseDetails();
      },
      (error) => {
        console.error('Error loading enrollments:', error);
      }
    );
  }

  loadStudentAndCourseDetails() {
    this.studentsService.getStudents().subscribe(students => {
      this.courseService.getCourses().subscribe(courses => {
        this.enrollments = this.enrollments.map(enrollment => ({
          ...enrollment,
          studentName: students.find(s => s.id === enrollment.studentId)?.firstName + ' ' + students.find(s => s.id === enrollment.studentId)?.lastName,
          courseName: courses.find(c => c.id === enrollment.courseId)?.name
        }));
      });
    });
  }

  openDialog(enrollment?: Enrollment) {
    const dialogRef = this.dialog.open(EnrollmentDialogComponent, {
      width: '400px',
      data: { enrollment: enrollment || {}, isNew: !enrollment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          // Update is not implemented for enrollments
        } else {
          this.enrollmentService.addEnrollment(result).subscribe(
            () => {
              this.loadEnrollments();
            },
            (error) => {
              console.error('Error agregando asignación:', error);
            }
          );
        }
      }
    });
  }

  deleteEnrollment(enrollment: Enrollment) {
    if (confirm(`¿Estás seguro de que quieres eliminar esta asignación?`)) {
      this.enrollmentService.deleteEnrollment(enrollment.id!).subscribe(
        () => {
          this.loadEnrollments();
        },
        (error: HttpErrorResponse) => {
          console.error('Error eliminando asignación:', error);
        }
      );
    }
  }
}