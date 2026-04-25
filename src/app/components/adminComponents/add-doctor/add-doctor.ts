import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { FirstInvalid } from '../../../directives/first-invalid';
import { AuthAdmin } from '../../../services/auth-admin';

@Component({
  selector: 'app-add-doctor',
  imports: [FontAwesomeModule, ReactiveFormsModule, FirstInvalid],
  templateUrl: './add-doctor.html',
  styleUrl: './add-doctor.css',
})
export class AddDoctor implements OnInit {
  docIcon = faUserDoctor;
  docForm!: FormGroup;
  showImg: WritableSignal<boolean> = signal(false);
  docImg: string = '';
  specialityList: string[] = [
    'Cardiology',
    'Orthopedics',
    'Ophthalmology',
    'Dentistry',
    'Neurology',
    'Pediatrics',
  ];
  degreeList: string[] = ['MBBCh', 'MSc', 'MD / PhD'];
  constructor(
    private fb: FormBuilder,
    private authAdmin: AuthAdmin,
  ) {}
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
  submit(e: any) {
    if (this.docForm.invalid) {
      e.preventDefault();
      this.docForm.markAllAsTouched();
    } else {
      this.submitData();
      this.docForm.reset();
      this.showImg.set(false);
      this.docImg = '';
    }
  }
  imgUploaded(event: any) {
    // console.log(this.docForm.get('imgFile')?.value);
    let file = event.target.files[0];
    if (file) {
      this.docForm.patchValue({ imgFile: file });
      // console.log(this.docForm.get('imgFile')?.value);
      const reader = new FileReader();
      reader.onload = () => {
        this.docImg = reader.result as string;
        this.showImg.set(true);
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    }
  }
  submitData(): void {
    const docData = new FormData();
    docData.append('name', this.docForm.get('name')?.value);
    docData.append('email', this.docForm.get('email')?.value);
    docData.append('password', this.docForm.get('password')?.value);
    docData.append('experience', this.docForm.get('experience')?.value);
    docData.append('consultationFee', this.docForm.get('consultationFee')?.value);
    docData.append('speciality', this.docForm.get('speciality')?.value);
    docData.append('degree', this.docForm.get('degree')?.value);
    docData.append(
      'address',
      JSON.stringify({
        line1: this.docForm.get('address.line1')?.value,
        line2: this.docForm.get('address.line2')?.value,
      }),
    );
    docData.append('about', this.docForm.get('about')?.value);
    if (this.docForm.get('imgFile')?.value) {
      docData.append('image', this.docForm.get('imgFile')?.value);
    }
    this.authAdmin.addDoctor(docData).subscribe(console.log);
  }
}
