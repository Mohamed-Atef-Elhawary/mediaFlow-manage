import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-doctor',
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './add-doctor.html',
  styleUrl: './add-doctor.css',
})
export class AddDoctor implements OnInit {
  docIcon = faUserDoctor;
  docForm!: FormGroup;
  specialityList: string[] = [
    'Cardiology',
    'Orthopedics',
    'Ophthalmology',
    'Dentistry',
    'Neurology',
    'Pediatrics',
  ];
  degreeList: string[] = ['MBBCh', 'MSc', 'MD / PhD'];
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.makeForm();
  }

  makeForm() {
    this.docForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      experience: ['', [Validators.required, Validators.min(0), Validators.max(30)]],
      consultationFee: ['', [Validators.required, Validators.min(1)]],
      speciality: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      address: this.fb.group({
        line1: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
        line2: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      }),
      about: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      imgFile: [],
    });
  }
  submit() {
    console.log(this.docForm.controls);
    console.log(this.docForm.value);
    console.log(this.docForm.valid);
  }
}
