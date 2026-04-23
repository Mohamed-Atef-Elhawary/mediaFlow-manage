import { Component, OnInit, signal, WritableSignal } from '@angular/core';
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
  imports: [FontAwesomeModule],
  templateUrl: './admin-appoinments.html',
  styleUrl: './admin-appoinments.css',
})
export class AddminAppoinments implements OnInit {
  allAppointments: WritableSignal<AppointmentData[]> = signal([]);
  xIcon = faXmark;
  checkIcon = faCheck;
  constructor(
    private authAdmin: AuthAdmin,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.authAdmin.appointmentsList().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.allAppointments.set(res.data);
          console.log(this.allAppointments());
        } else {
          this.toastr.error(res.message, 'Error', toastrConfig.errorConfig);
          console.log(res);
        }
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error', toastrConfig.errorConfig);
        console.log(err);
      },
    });
  }
  getAge(date: string): number {
    let year: number = new Date().getFullYear();
    let dob = new Date(Number(date));
    return year - dob.getFullYear();
  }
}
