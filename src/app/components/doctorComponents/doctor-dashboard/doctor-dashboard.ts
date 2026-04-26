import { ChangeDetectorRef, Component, signal, WritableSignal } from '@angular/core';
import { AuthAdmin } from '../../../services/auth-admin';
import { DashData } from '../../../interfaces/dash-data';
import { APIResponse } from '../../../interfaces/apiresponse';

import { ToastrService } from 'ngx-toastr';
import { toastrConfig } from '../../../config/toastrConfig';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faSackDollar } from '@fortawesome/free-solid-svg-icons';

import { faBookMedical } from '@fortawesome/free-solid-svg-icons';
import { faUserInjured } from '@fortawesome/free-solid-svg-icons';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';

import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthDoctor } from '../../../services/auth-doctor';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [FontAwesomeModule, DatePipe, CurrencyPipe],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css',
})
export class DoctorDashboard {
  dashData: WritableSignal<DashData> = signal({
    completedAppointments: [],
    money: 0,
    numberOfAppointments: 0,
    numberOfPatients: 0,
  });

  moneyIcon = faSackDollar;
  appointIcon = faBookMedical;
  patientIcon = faUserInjured;
  shareIcon = faShareFromSquare;

  constructor(
    private authDoctor: AuthDoctor,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.authDoctor.doctorDashboard().subscribe({
      next: (res: APIResponse) => {
        if (res.success && res.data) {
          this.dashData.set(res.data);
          console.log(this.dashData());
        } else {
          console.log(res);
        }
      },
      error: (err: APIResponse) => {
        this.toastr.error(err.message, 'Error', toastrConfig.errorConfig);
        console.log(err);
      },
    });
  }
  getDate(date: string): Date {
    return new Date(Number(date));
  }
}
