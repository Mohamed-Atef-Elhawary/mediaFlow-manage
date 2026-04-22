import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService);

  if (authservice.authView() === 'login') {
    return true;
  }
  return false;
};
