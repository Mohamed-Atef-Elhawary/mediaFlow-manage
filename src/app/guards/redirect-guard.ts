import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const redirectGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  let dir: string = 'outer';
  if (authService.authView() === 'authorized') {
    dir = authService.authLogger();
  }
  return router.parseUrl(`/${dir}`);
};
