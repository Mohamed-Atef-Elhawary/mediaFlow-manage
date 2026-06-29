import { Injectable, signal, WritableSignal } from '@angular/core';
import { DoctorInfo } from '../interfaces/loggerInfo';
import { Observable } from 'rxjs';
import { APIResponse } from '../interfaces/apiresponse';
import { LoginApi } from '../interfaces/login-api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthDoctor {
  doctorInfo: WritableSignal<DoctorInfo | null> = signal(this.getInfo());
  constructor(private http: HttpClient) {}

  getInfo(): DoctorInfo | null {
    const doctorInfo = localStorage.getItem('doctorInfo');
    if (doctorInfo) {
      return JSON.parse(doctorInfo);
    }
    return null;
  }

  setInfo(doctorInfo: DoctorInfo): void {
    localStorage.setItem('doctorInfo', JSON.stringify(doctorInfo));
    this.doctorInfo.set(doctorInfo);
  }

  login(data: LoginApi): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.backendUrl}doctor/login`, data);
  }

  doctorDashboard(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${environment.backendUrl}doctor/dashboard`);
  }
  doctorAppointments(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${environment.backendUrl}doctor/appointment`);
  }

  completeAppointment(appointmentId: string): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.backendUrl}doctor/complete`, {
      appointmentId,
    });
  }

  getProfile(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${environment.backendUrl}doctor/profile`);
  }

  updateProfile(docData: FormData): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.backendUrl}doctor/update`, docData);
  }

  logout() {
    localStorage.removeItem('doctorInfo');
    this.doctorInfo.set(null);
  }
}
