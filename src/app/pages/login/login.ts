import { Component, computed, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { PhotoService } from '../../services/photoservice';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { LoginType } from '../../types/LoginType';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  logo: string;
  authLogger = signal<LoginType>('admin');
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private photo: PhotoService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.logo = this.photo.static.logo;
  }

  ngOnInit() {
    this.cleareLoginForm();
  }

  update(logger: LoginType) {
    this.authLogger.set(logger);
  }

  cleareLoginForm() {
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
  submit() {}

  login() {}
}
