import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthDoctor } from '../services/auth-doctor';
import { APIResponse } from '../interfaces/apiresponse';

export const docProfileDataResolver: ResolveFn<APIResponse> = (route, state) => {
  const authDoctor = inject(AuthDoctor);
  return authDoctor.getProfile();
};
