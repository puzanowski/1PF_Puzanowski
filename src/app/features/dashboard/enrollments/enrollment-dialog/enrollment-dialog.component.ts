import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Enrollment } from '../../../../shared/models/enrollment.model';
import { Student } from '../../../../shared/models/student.model';
import { Course } from '../../../../shared/models/course.model';
import { StudentsService } from '../../../../shared/services/students.service';
import { CourseService } from '../../../../shared/services/course.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrls: ['./enrollment-dialog.component.css']
})
export class EnrollmentDialogComponent implements OnInit {
  enrollmentForm!: FormGroup;
  dialogTitle: string;
  students: Student[] = [];
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { enrollment: Enrollment, isNew: boolean },
    private studentService: StudentsService,
    private courseService: CourseService
  ) {
    this.dialogTitle = data.isNew ? 'Nueva asignación' : 'Editar asignación';
  }

  ngOnInit() {
    this.enrollmentForm = this.fb.group({
      studentId: [this.data.enrollment.studentId || 0, [Validators.required, this.greaterThanZeroValidator]],
      courseId: [this.data.enrollment.courseId || 0, [Validators.required, this.greaterThanZeroValidator]],
      enrollmentDate: [this.data.enrollment.enrollmentDate || new Date(), Validators.required]
    });

    this.loadStudents();
    this.loadCourses();
  }
  
  greaterThanZeroValidator(control: FormControl) {
    return control.value > 0 ? null : { greaterThanZero: true };
  }
 
  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => {
        console.error('Error cargando alumnos:', error);
      }
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error('Error cargando cursos:', error);
      }
    });
  }

  onSubmit() {
    if (this.enrollmentForm.valid) {
      const enrollment: Enrollment = {
        ...this.data.enrollment,
        ...this.enrollmentForm.value,
        id: this.data.enrollment?.id
      };
      
      this.dialogRef.close(enrollment);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}