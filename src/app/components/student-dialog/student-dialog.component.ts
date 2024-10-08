import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {
  studentForm!: FormGroup;
  dialogTitle: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { student: Student, isNew: boolean }
  ) {
    this.dialogTitle = data.isNew ? 'Nuevo Alumno' : 'Editar Alumno';
  }

  ngOnInit() {
    this.studentForm = this.fb.group({
      firstName: [this.data.student.firstName || '', Validators.required],
      lastName: [this.data.student.lastName || '', Validators.required],
      email: [this.data.student.email || '', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const student: Student = {
        ...this.data.student,
        ...this.studentForm.value
      };
      this.dialogRef.close(student);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}