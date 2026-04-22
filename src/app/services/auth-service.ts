import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { AuthType } from '../types/AuthType';
import { LoginType } from '../types/LoginType';
import { AuthAdmin } from './auth-admin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authView: WritableSignal<AuthType> = signal('outer');
  authLogger: WritableSignal<LoginType> = signal('admin');

  constructor(private authAdmin: AuthAdmin) {
    this.setAuthView();
  }

  setAuthView() {
    if (this.authAdmin.adminInfo()) {
      this.authView.set('authorized');
    } else {
      this.authView.set('outer');
    }
  }
}
