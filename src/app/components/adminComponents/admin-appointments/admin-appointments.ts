import { ChangeDetectorRef, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthAdmin } from '../../../services/auth-admin';
import { AppointmentData } from '../../../interfaces/appointment-data';
import { ToastrService } from 'ngx-toastr';
import { toastrConfig } from '../../../config/toastrConfig';
import { DatePipe } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-addmin-appoinments',
  imports: [FontAwesomeModule, DatePipe],
  templateUrl: './admin-appointments.html',
  styleUrl: './admin-appointments.css',
})
export class AddminAppoinments implements OnInit {
  allAppointments: WritableSignal<AppointmentData[]> = signal([]);
  xIcon = faXmark;
  checkIcon = faCheck;
  constructor(
    private authAdmin: AuthAdmin,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.authAdmin.appointmentsList().subscribe({
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
    let dob = Number(date.split('-')[0]);
    return year - dob;
  }
  getAppointmentDate(date: string): Date {
    return new Date(Number(date));
  }
  deleteAppointment(id: string) {
    this.authAdmin.deleteAppointment(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.allAppointments.update((value) => {
            return value.filter((appointment) => appointment._id !== id);
          });
          this.cdr.detectChanges();
          this.toastr.success(res.message, 'Canceled', toastrConfig.successConfig);
        } else {
          this.toastr.error(res.message, 'Error', toastrConfig.errorConfig);
        }
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error', toastrConfig.errorConfig);
      },
    });
  }
  completeAppointment(id: string, index: number) {
    this.authAdmin.completeAppointment(id).subscribe({
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
