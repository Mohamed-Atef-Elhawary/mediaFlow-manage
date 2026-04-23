import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { AuthAdmin } from '../../../services/auth-admin';
import { DashData } from '../../../interfaces/dash-data';
import { APIResponse } from '../../../interfaces/apiresponse';

import { ToastrService } from 'ngx-toastr';
import { toastrConfig } from '../../../config/toastrConfig';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { faBookMedical } from '@fortawesome/free-solid-svg-icons';
import { faUserInjured } from '@fortawesome/free-solid-svg-icons';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FontAwesomeModule, DatePipe],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  dashData: WritableSignal<DashData> = signal({
    latestAppointments: [],
    numberOdDoctors: 0,
    numberOfAppointments: 0,
    numberOfPatients: 0,
  });
  docIcon = faUserDoctor;
  appointIcon = faBookMedical;
  patientIcon = faUserInjured;
  shareIcon = faShareFromSquare;
  xIcon = faXmark;
  checkIcon = faCheck;
  constructor(
    private authAdmin: AuthAdmin,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.authAdmin.adminDashboard().subscribe({
      next: (res: APIResponse) => {
        if (res.success && res.data) {
          this.dashData.set(res.data);
          console.log(this.dashData());
        } else {
          console.log(res);
        }
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error', toastrConfig.errorConfig);
        console.log(err);
      },
    });
  }
  getDate(date: string): Date {
    return new Date(Number(date));
  }
}
