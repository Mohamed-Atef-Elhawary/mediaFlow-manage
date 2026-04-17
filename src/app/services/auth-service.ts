import { effect, Injectable, signal } from '@angular/core';
import { AuthType } from '../types/AuthType';
import { LoginType } from '../types/LoginType';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authView = signal<AuthType>('outer');

  constructor() {}
}
