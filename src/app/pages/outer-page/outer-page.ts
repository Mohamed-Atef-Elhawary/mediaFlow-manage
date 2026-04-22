import { Component, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PhotoService } from '../../services/photoservice';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-outer-page',
  imports: [],
  templateUrl: './outer-page.html',
  styleUrl: './outer-page.css',
})
export class OuterPage {
  outerPhoto: string;
  constructor(
    private auth: AuthService,
    private router: Router,
    private photo: PhotoService,
  ) {
    this.outerPhoto = this.photo.static.outer;
  }

  start() {
    this.auth.authView.set('login');
    this.router.navigate(['/login']);
  }
}
