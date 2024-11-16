import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser;

  console.log('guard', user);
  if (user && user.role === 'admin') {
    return true; 
  } else {
    router.navigate(['./not-authorized']);
    return false;
  }
};
