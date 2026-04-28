import { Injectable, signal, WritableSignal } from '@angular/core';
import { DoctorInfo } from '../interfaces/loggerInfo';
import { Observable } from 'rxjs';
import { APIResponse } from '../interfaces/apiresponse';
import { LoginApi } from '../interfaces/login-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UpdateDoctorData } from '../interfaces/update-doctor-data';

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
  logout() {
    localStorage.removeItem('doctorInfo');
    this.doctorInfo.set(null);
  }

  doctorDashboard(): Observable<APIResponse> {
    const token = this.doctorInfo()?.token;
    return this.http.get<APIResponse>(`${environment.backendUrl}doctor/dashboard`, {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    });
  }
  doctorAppointments(): Observable<APIResponse> {
    const token = this.doctorInfo()?.token;
    return this.http.get<APIResponse>(`${environment.backendUrl}doctor/appointment`, {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    });
  }

  cancelAppointment(appointmentId: string): Observable<APIResponse> {
    const token = this.doctorInfo()?.token;
    return this.http.post<APIResponse>(
      `${environment.backendUrl}doctor/cancel`,
      { appointmentId },
      {
        headers: new HttpHeaders({
          authorization: `Bearer ${token}`,
        }),
      },
    );
  }
  completeAppointment(appointmentId: string): Observable<APIResponse> {
    const token = this.doctorInfo()?.token;
    return this.http.post<APIResponse>(
      `${environment.backendUrl}doctor/complete`,
      { appointmentId },
      {
        headers: new HttpHeaders({
          authorization: `Bearer ${token}`,
        }),
      },
    );
  }

  getProfile(): Observable<APIResponse> {
    const token = this.doctorInfo()?.token;
    return this.http.get<APIResponse>(`${environment.backendUrl}doctor/profile`, {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    });
  }

  updateProfile(docData: FormData): Observable<APIResponse> {
    const token = this.doctorInfo()?.token;
    console.log('token ', token);
    return this.http.post<APIResponse>(`${environment.backendUrl}doctor/update`, docData, {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    });
  }
}
