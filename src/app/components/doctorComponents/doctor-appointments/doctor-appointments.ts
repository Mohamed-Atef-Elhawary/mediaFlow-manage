import { ChangeDetectorRef, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { AppointmentData } from '../../../interfaces/appointment-data';
import { ToastrService } from 'ngx-toastr';
import { toastrConfig } from '../../../config/toastrConfig';
import { DatePipe } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthDoctor } from '../../../services/auth-doctor';

@Component({
  selector: 'app-doctor-appointments',
  imports: [FontAwesomeModule, DatePipe],
  templateUrl: './doctor-appointments.html',
  styleUrl: './doctor-appointments.css',
})
export class DoctorAppointments implements OnInit {
  allAppointments: WritableSignal<AppointmentData[]> = signal([]);
  xIcon = faXmark;
  checkIcon = faCheck;
  constructor(
    private authDoctor: AuthDoctor,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.authDoctor.doctorAppointments().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.allAppointments.set(res.data);
        } else {
          this.toastr.error(res.message, 'Error', toastrConfig.errorConfig);
        }
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error', toastrConfig.errorConfig);
      },
    });
  }
  getAge(date: string): number {
    let year: number = new Date().getFullYear();
    let dob = new Date(Number(date));
    return year - dob.getFullYear();
  }
  getAppointmentDate(date: string): Date {
    return new Date(Number(date));
  }

  completeAppointment(id: string, index: number) {
    this.authDoctor.completeAppointment(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.allAppointments.update((value) => {
            value[index].isCompleted = true;
            return value;
          });
          this.cdr.detectChanges();
          this.toastr.success(res.message, 'completed', toastrConfig.successConfig);
        } else {
          this.toastr.error(res.message, 'error', toastrConfig.errorConfig);
        }
      },
      error: (err) => {
        this.toastr.error(err.message, 'error', toastrConfig.errorConfig);
      },
    });
  }
}
