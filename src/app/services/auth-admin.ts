import { Injectable, signal, WritableSignal } from '@angular/core';
import { LoginApi } from '../interfaces/login-api';
import { Observable } from 'rxjs';
import { APIResponse } from '../interfaces/apiresponse';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AdminInfo } from '../interfaces/admin-info';
@Injectable({
  providedIn: 'root',
})
export class AuthAdmin {
  constructor(private http: HttpClient) {}
  adminInfo: WritableSignal<AdminInfo | null> = signal<AdminInfo | null>(this.getInfo());

  setInfo(data: AdminInfo): void {
    localStorage.setItem('adminInfo', JSON.stringify(data));
    this.adminInfo.set(data);
  }
  getInfo(): AdminInfo | null {
    let adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      return JSON.parse(adminInfo);
    }
    return null;
  }
  removeInfo(): void {
    localStorage.removeItem('adminInfo');
    this.adminInfo.set(null);
  }

  login(data: LoginApi): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.backendUrl}admin/login`, data);
  }
}
