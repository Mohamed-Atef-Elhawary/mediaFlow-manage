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
import { CurrencyPipe, DatePipe, NgClass, NgStyle } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthDoctor } from '../../../services/auth-doctor';
import { RequestDoctorData } from '../../../interfaces/requst-doctorData';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirstInvalid } from '../../../directives/first-invalid';
import { RankData } from '../../../interfaces/rank-data';

@Component({
  selector: 'app-doctor-profile',
  imports: [CurrencyPipe, FontAwesomeModule, NgClass, NgStyle, ReactiveFormsModule, FirstInvalid],
  templateUrl: './doctor-profile.html',
  styleUrl: './doctor-profile.css',
})
export class DoctorProfile implements OnInit {
  docData: WritableSignal<RequestDoctorData | null> = signal(null);
  docRank: WritableSignal<RankData> = signal({
    rank: { decimal: 0, frag: 0 },
    totalReviewers: 0,
    ratingDistribution: {},
  });
  starIcon = faStar;
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
    console.log('this.docData()', this.docData());
    this.makeForm();
    this.aplayRanking();
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
  aplayRanking(): void {
    let docData = this.docData();
    if (docData) {
      // const { rank: rankAlias, totalReviewers } = this.docData();
      const rankAlias = docData.rank;
      const totalReviewers = docData.totalReviewers;

      if (rankAlias && totalReviewers) {
        let ranking: string[] = rankAlias.toString().split('.');
        if (ranking[1] && ranking[1].length > 2) {
          ranking[1] = ranking[1].slice(0, 1);
        }
        let rank = {
          decimal: Number(ranking[0]),
          frag: Number(ranking[1] || 0),
        };
        let ratingDistribution: { [key: string]: string } = {};
        for (let key of Object.keys(docData.ratingDistribution)) {
          console.log(docData.ratingDistribution);
          if (docData.ratingDistribution[key]) {
            let rate = (docData.ratingDistribution[key] / totalReviewers) * 100;
            ratingDistribution[key] = `${rate}%`;
          } else {
            ratingDistribution[key] = `${docData.ratingDistribution[key]}%`;
          }
        }

        this.docRank.set({
          rank,
          totalReviewers,
          ratingDistribution,
        });
        this.cdr.detectChanges();
      }
    }
  }
}
/*
 
  <!-- srart docRank -->
    <div class="flex gap-4">
      <!-- startrank -->
      <div class="w-fit sm:w-[20%] shrink-0">
        <p class="text-[50px]">{{ docRank().rank.decimal }}.{{ docRank().rank.frag }}</p>
        <div class="flex gap-[2px]">
          @for (rank of [1, 2, 3, 4, 5]; track $index) {
            <div class="relative w-fit">
              <div class="text-gray-300">
                <fa-icon class="text-[12px]" [icon]="starIcon"></fa-icon>
              </div>

              @if (rank <= docRank().rank.decimal) {
                <div class="absolute top-0 left-0 overflow-hidden text-primary">
                  <fa-icon class="text-[12px]" [icon]="starIcon"></fa-icon>
                </div>
              } @else if (rank === docRank().rank.decimal + 1) {
                <div
                  [ngStyle]="{ width: docRank().rank.frag * 10 + '%' }"
                  class="absolute top-0 left-0 overflow-hidden text-primary"
                >
                  <fa-icon class="text-[12px]" [icon]="starIcon"></fa-icon>
                </div>
              }
            </div>
          }
        </div>

        <p class="text-secondary">Reviewers {{ docRank().totalReviewers }}</p>
      </div>
      <!-- endrank -->
      <!-- start rating distribution -->
      <div class="sm:w-[80%] flex flex-col grow">
        @for (dist of [5, 4, 3, 2, 1]; track $index) {
          <div class="flex gap-2 items-center w-full">
            <p class="text-secondary text-[12px]">{{ dist }}</p>
            <div class="bg-gray-200 h-[8px] grow-1 rounded-full overflow-hidden">
              <div
                [style.width]="docRank().ratingDistribution[dist]"
                class="h-full bg-primary w-0"
              ></div>
            </div>
          </div>
        }
      </div>
      <!-- end rating distribution-->
    </div>

    <!-- end docRank -->
*/
