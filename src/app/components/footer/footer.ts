import { Component, computed } from '@angular/core';
import { PhotoService } from '../../services/photoservice';
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  logo: string;
  constructor(
    private photo: PhotoService,
    private auth: AuthService,
  ) {
    this.logo = this.photo.static.logo;
  }
  display = computed(() => this.auth.authView() === 'authorized');
  // console.log('from outer ', this.auth.authView());
}
