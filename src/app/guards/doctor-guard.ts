import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const doctorGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);

  const value: boolean =
    authService.authView() === 'authorized' && authService.authLogger() === 'doctor';
  return value;
};
