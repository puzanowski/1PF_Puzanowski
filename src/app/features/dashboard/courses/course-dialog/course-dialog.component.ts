import { Component, Inject, OnInit, ɵɵviewQuerySignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../../../shared/models/course.model';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  courseForm!: FormGroup;
  dialogTitle: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { course: Course, isNew: boolean }
  ) {
    this.dialogTitle = data.isNew ? 'Nuevo curso' : 'Editar curso';
  }

  ngOnInit() {
    this.courseForm = this.fb.group({
      name: [this.data.course.name || '', Validators.required],
      description: [this.data.course.description || '', Validators.required],
      quantity: [this.data.course.quantity || 0, Validators.required],
      assignedProfessor: [this.data.course.assignedProfessor || '', Validators.required]
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const course: Course = {
        ...this.data.course,
        ...this.courseForm.value
      };
      this.dialogRef.close(course);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}