import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { AuthDoctor } from '../services/auth-doctor';
import { AuthAdmin } from '../services/auth-admin';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;
  let reqCloned = req;
  const logger: string = inject(AuthService).authLogger();
  let endPoints: string[] = [];
  let token: string = '';
  if (logger === 'doctor') {
    const authDoctor = inject(AuthDoctor);
    endPoints = ['dashboard', 'appointment', 'complete', 'profile', 'update'];
    token = `Bearer ${authDoctor.doctorInfo()?.token}`;
  } else if (logger === 'admin') {
    const authAdmin = inject(AuthAdmin);
    endPoints = ['dashboard', 'doctorlist', 'add', 'delete', 'complete'];
    token = `Bearer ${authAdmin.adminInfo()?.token}`;
  }

  const hasEndPoint = endPoints.some((point) => url.includes(point));
  if (hasEndPoint) {
    reqCloned = req.clone({
      setHeaders: { authorization: token },
    });
  }
  return next(reqCloned);
};
