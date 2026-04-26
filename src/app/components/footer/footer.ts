import { Component, computed } from '@angular/core';
import { PhotoService } from '../../services/photoservice';

import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  // logo: string;
  constructor(
    // private photo: PhotoService,
    private auth: AuthService,
  ) {
    // this.logo = this.photo.static.logo;
  }

  display = computed(
    () => this.auth.authView() === 'authorized' || this.auth.authView() === 'logged',
  );
  // console.log('from outer ', this.auth.authView());
}
/**
  <div class="flex gap-4 flex-col lg:flex-row">
      <!--start logo -->
      <div class="overflow-hidden w-full lg:w-[50%] flex flex-col">
        <div class="overflow-hidden w-full h-30">
          <img
            class="w-full h-full object-cover bg-sky-400 hover:bg-primary"
            [src]="logo"
            alt="mediaFlow Logo"
          />
        </div>

        <div class="text-secondary text-center p-4 lg:text-[1.5vw]">
          mediaFlow: Your Gateway to Digital Health. Leading the way in smart doctor-patient
          connections and healthcare management solutions.
        </div>
      </div>
      <!--start sections -->
      <div class="w-full lg:w-[50%] flex flex-col md:flex-row">
        <section class="w-full lg:w-[50%] text-center">
          <h2 class="text-dark font-medium mb-6">COMPANY</h2>
          <ul class="flex flex-col gap-y-4 lg:text-[1.5vw]">
            <li class="text-secondary lg:text-[1.5vw]">Home</li>
            <li class="text-secondary lg:text-[1.5vw]">About us</li>
            <li class="text-secondary lg:text-[1.5vw]">Contact</li>
            <li class="text-secondary pb-4 lg:text-[1.5vw]">Privacy policy</li>
          </ul>
        </section>
        <section class="w-full lg:w-[50%] text-center lg:text-[1.5vw]">
          <h2 class="text-dark font-medium mb-6">GET IN TOUCH</h2>
          <p class="pb-4 text-secondary">01000000000</p>
          <p class="text-dark font-medium mb-6">mediaFlow@gmail.com</p>
        </section>
      </div>
      <!--end sections -->
    </div> -->
 */
