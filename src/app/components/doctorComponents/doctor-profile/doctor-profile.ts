import {
  ChangeDetectorRef,
  Component,
  computed,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { toastrConfig } from '../../../config/toastrConfig';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthDoctor } from '../../../services/auth-doctor';
import { RequestDoctorData } from '../../../interfaces/requst-doctorData';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirstInvalid } from '../../../directives/first-invalid';

@Component({
  selector: 'app-doctor-profile',
  imports: [CurrencyPipe, FontAwesomeModule, NgClass, ReactiveFormsModule, FirstInvalid],
  templateUrl: './doctor-profile.html',
  styleUrl: './doctor-profile.css',
})
export class DoctorProfile implements OnInit {
  docData: WritableSignal<RequestDoctorData | null> = signal(null);
  availableIcon = faCircleCheck;
  notAvailableIcon = faCircleXmark;
  updateDocInfo: WritableSignal<boolean> = signal(true);
  saveDocInfo: WritableSignal<boolean> = signal(false);
  docForm!: FormGroup;
  constructor(
    private authDoctor: AuthDoctor,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.docData.set(this.route.snapshot.data['docResolver'].data);
    this.makeForm();
  }
  makeForm() {
    this.docForm = this.fb.group({
      consultationFee: [
        this.docData()?.consultationFee,
        [Validators.required, Validators.min(1), Validators.max(1000000)],
      ],
      address: this.fb.group({
        line1: [
          this.docData()?.address.line1,
          [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
        ],
        line2: [
          this.docData()?.address.line2,
          [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
        ],
      }),
      available: [this.docData()?.available],
      image: [],
    });
    this.cdr.detectChanges();
  }

  fileUploaded(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.docForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.docData.update((data: RequestDoctorData | null) => {
          if (data) {
            data.image = reader.result as string;
            console.log(event.target.value);
            this.cdr.detectChanges();
            return data;
          }
          return null;
        });
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    }
  }

  updateDocInfoState() {
    if (!this.updateDocInfo()) {
      this.saveDocInfo.set(true);
    }
    this.updateDocInfo.set(false);
  }
  submit() {
    if (this.saveDocInfo()) {
      if (this.docForm.valid) {
        this.makeFormData();
      }
    }
  }
  makeFormData() {
    const formData = new FormData();
    formData.append('consultationFee', this.docForm.get('consultationFee')?.value);
    formData.append('available', this.docForm.get('available')?.value);
    formData.append(
      'address',
      JSON.stringify({
        line1: this.docForm.get('address.line1')?.value,
        line2: this.docForm.get('address.line2')?.value,
      }),
    );
    if (this.docForm.get('image')) {
      formData.append('image', this.docForm.get('image')?.value);
    }
    this.authDoctor.updateProfile(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/doctor']);
        }
      },
      error: (err) => {
        this.toastr.error(err.message, 'Errro', toastrConfig.errorConfig);
      },
    });
  }
}
