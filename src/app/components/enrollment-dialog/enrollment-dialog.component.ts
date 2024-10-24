import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Enrollment } from '../../models/enrollment.model';
import { Student } from '../../models/student.model';
import { Course } from '../../models/course.model';
import { StudentsService } from '../../services/students.service';
import { CourseService } from '../../services/course.service';

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
      studentId: [this.data.enrollment.studentId || 0, Validators.required],
      courseId: [this.data.enrollment.courseId || 0, Validators.required],
      enrollmentDate: [this.data.enrollment.enrollmentDate || new Date(), Validators.required]
    });

    this.loadStudents();
    this.loadCourses();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error cargando alumnos:', error);
      }
    );
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(
      (courses) => {
        this.courses = courses;
      },
      (error) => {
        console.error('Error cargando cursos:', error);
      }
    );
  }

  onSubmit() {
    if (this.enrollmentForm.valid) {
      const enrollment: Enrollment = {
        ...this.data.enrollment,
        ...this.enrollmentForm.value
      };
      this.dialogRef.close(enrollment);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}