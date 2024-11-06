import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public async onRegister(): Promise<void> {
    if (this.registerForm.invalid) {
      this.showSnackBar('Por favor, completa todos los campos correctamente.');
      
      return;
    }

    try {
      const newUser = await firstValueFrom(this.authService.register(this.registerForm.value));
      this.showSnackBar('Registro exitoso. Ahora puedes iniciar sesión.');
      
      this.router.navigateByUrl('/auth/login');
    } catch (error) {
     this.showSnackBar('Hubo un error en el registro. Inténtalo de nuevo.');
    }
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
