import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const outerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.authView() === 'outer') {
    return true;
  }
  return false;
};
