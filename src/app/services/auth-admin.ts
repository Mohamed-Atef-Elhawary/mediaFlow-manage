import { Injectable, signal, WritableSignal } from '@angular/core';
import { LoginApi } from '../interfaces/login-api';
import { Observable } from 'rxjs';
import { APIResponse } from '../interfaces/apiresponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AdminInfo } from '../interfaces/loggerInfo';

@Injectable({
  providedIn: 'root',
})
export class AuthAdmin {
  constructor(private http: HttpClient) {}

  adminInfo: WritableSignal<AdminInfo | null> = signal<AdminInfo | null>(this.getInfo());

  getInfo(): AdminInfo | null {
    let adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      return JSON.parse(adminInfo);
    }
    return null;
  }

  setInfo(data: AdminInfo): void {
    localStorage.setItem('adminInfo', JSON.stringify(data));
    this.adminInfo.set(data);
  }

  login(data: LoginApi): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.backendUrl}admin/login`, data);
  }

  adminDashboard(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${environment.backendUrl}admin/dashboard`, {});
  }

  appointmentsList(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${environment.backendUrl}admin/appointmentlist`, {});
  }

  doctorsList(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${environment.backendUrl}admin/doctorlist`, {});
  }

  addDoctor(docData: FormData): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.backendUrl}admin/add`, docData, {});
  }

  deleteAppointment(appointmentId: string): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.backendUrl}admin/delete`, { appointmentId });
  }
  completeAppointment(appointmentId: string): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.backendUrl}admin/complete`, {
      appointmentId,
    });
  }

  logout() {
    localStorage.removeItem('adminInfo');
    this.adminInfo.set(null);
  }
}
