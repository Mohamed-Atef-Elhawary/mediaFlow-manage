import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { AuthType } from '../types/AuthType';
import { LoginType } from '../types/LoginType';
import { AuthAdmin } from './auth-admin';
import { AuthDoctor } from './auth-doctor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authView: WritableSignal<AuthType> = signal('outer');
  authLogger: WritableSignal<LoginType> = signal(null);

  constructor(
    private authAdmin: AuthAdmin,
    private authDoctor: AuthDoctor,
  ) {
    this.setAuthView();
    this.setAuthLogger();
  }

  setAuthView() {
    if (this.authAdmin.adminInfo()) {
      this.authView.set('logged');
    } else if (this.authDoctor.doctorInfo()) {
      this.authView.set('logged');
    } else {
      this.authView.set('outer');
    }
  }
  setAuthLogger() {
    if (this.authAdmin.adminInfo()) {
      this.authLogger.set('admin');
    } else if (this.authDoctor.doctorInfo()) {
      this.authLogger.set('doctor');
    }
  }
}
