import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: []
})
export class UserDialogComponent implements OnInit {
  userForm!: FormGroup;
  dialogTitle: string;
  roles: string[] = ['admin', 'student'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, isNew: boolean }
  ) {
    this.dialogTitle = data.isNew ? 'Nuevo Usuario' : 'Editar Usuario';
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: [this.data.user.username || '', Validators.required],
      role: [this.data.user.role || 'student', Validators.required],
      password: [this.data.user.password || '', this.data.isNew ? Validators.required : []]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: User = {
        ...this.data.user,
        ...this.userForm.value
      };
      // Si no es nuevo y no se modificó la contraseña, la eliminamos del objeto
      if (!this.data.isNew && !this.userForm.get('password')?.value) {
        delete user.password;
      }
      this.dialogRef.close(user);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
} 