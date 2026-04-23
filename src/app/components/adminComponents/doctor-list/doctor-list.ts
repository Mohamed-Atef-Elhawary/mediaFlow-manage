import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RequestDoctorData } from '../../../interfaces/requst-doctorData';
import { AuthAdmin } from '../../../services/auth-admin';
import { ToastrService } from 'ngx-toastr';
import { toastrConfig } from '../../../config/toastrConfig';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-doctor-list',
  imports: [FontAwesomeModule],
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.css',
})
export class DoctorList implements OnInit {
  availableIcon = faCircleCheck;
  notAvailableIcon = faCircleXmark;
  allDoctors: WritableSignal<RequestDoctorData[]> = signal([]);
  constructor(
    private authAdmin: AuthAdmin,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.authAdmin.doctorsList().subscribe({
      next: (res) => {
        if (res.success) {
          this.allDoctors.set(res.data);
          console.log(this.allDoctors());
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.mesage, 'Error', toastrConfig.errorConfig);
      },
    });
  }
}
