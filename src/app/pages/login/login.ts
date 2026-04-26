import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { PhotoService } from '../../services/photoservice';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { toastrConfig } from '../../config/toastrConfig';
import { NgClass } from '@angular/common';
import { LoginType } from '../../types/LoginType';
import { LoginApi } from '../../interfaces/login-api';
import { AuthAdmin } from '../../services/auth-admin';
import { AuthDoctor } from '../../services/auth-doctor';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  logo: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authAdmin: AuthAdmin,
    private authDoctor: AuthDoctor,
    private photo: PhotoService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.logo = this.photo.static.logo;
  }
  authLogger: Signal<LoginType> = computed(() => this.authService.authLogger());

  ngOnInit() {
    console.log(this.authService.authView());
    this.makeForm();
  }

  update(logger: LoginType) {
    this.authService.authLogger.set(logger);
  }

  makeForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        },
      ],
      password: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(/^\S+/),
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
          nonNullable: true,
        },
      ],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  submit() {
    if (this.authLogger() === 'admin') {
      this.adminLogin(this.loginForm.value);
    } else {
      this.doctorLogin(this.loginForm.value);
    }
  }

  adminLogin(data: LoginApi) {
    this.authAdmin.login(data).subscribe({
      next: (res) => {
        if (res.success) {
          this.authAdmin.setInfo(res.data);
          this.authService.authView.set('authorized');
          this.router.navigate(['/admin']);
          console.log(this.authService.authView());
        }
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error', toastrConfig.errorConfig);
        console.log(err);
      },
    });
  }
  doctorLogin(data: LoginApi) {
    this.authDoctor.login(data).subscribe({
      next: (res) => {
        if (res.success) {
          this.authDoctor.setInfo(res.data);
          this.authService.authView.set('authorized');
          this.router.navigate(['/doctor']);
        } else {
          console.log(res);
          this.toastr.error(res.message, 'Error', toastrConfig.errorConfig);
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.message, 'Error', toastrConfig.errorConfig);
      },
    });
  }
}
