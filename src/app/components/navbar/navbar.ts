import { Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { PhotoService } from '../../services/photoservice';
import { LoginType } from '../../types/LoginType';
import { AuthAdmin } from '../../services/auth-admin';
import { AuthDoctor } from '../../services/auth-doctor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  logo: string;
  doctorImage!: string;
  constructor(
    private authService: AuthService,
    private authAdmin: AuthAdmin,
    private authDoctor: AuthDoctor,
    private router: Router,
    private photo: PhotoService,
  ) {
    this.logo = this.photo.static.logo1;
  }

  adminImage: Signal<string | null> = computed(() => {
    let img = this.authAdmin.adminInfo()?.image;
    if (img) return img;
    return null;
  });

  loger: Signal<LoginType> = computed(() => this.authService.authLogger());
  display: Signal<boolean> = computed(() => this.authService.authView() === 'authorized');

  ngOnInit(): void {
    this.getImages();
  }

  getImages(): void {
    // let adminImage: string | undefined = this.authAdmin.adminInfo()?.image;
    // if (adminImage) {
    // this.adminImage = adminImage;
  }
  // }

  logout() {
    if (this.authService.authLogger() === 'admin') {
      this.authAdmin.logout();
    } else if (this.authService.authLogger() === 'doctor') {
      this.authDoctor.logout();
    }
    this.authService.authView.set('outer');
    this.router.navigate(['/outer']);
  }
}
