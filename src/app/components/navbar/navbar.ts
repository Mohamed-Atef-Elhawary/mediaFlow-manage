import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  OnInit,
  signal,
  Signal,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { PhotoService } from '../../services/photoservice';
import { LoginType } from '../../types/LoginType';
import { AuthAdmin } from '../../services/auth-admin';
import { AuthDoctor } from '../../services/auth-doctor';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-navbar',
  imports: [NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements AfterViewInit {
  logo: string;
  doctorImage!: string;
  @ViewChild('modesComponent', { read: ViewContainerRef }) myModes!: ViewContainerRef;
  @ViewChild('switchUserMode', { read: ElementRef }) userModeSwitcher!: ElementRef;
  loger: Signal<LoginType> = computed(() => this.authService.authLogger());
  display: Signal<boolean> = computed(() => {
    let auth = this.authService.authView() === 'authorized';
    if (auth) {
      this.getModesOptions();
    }
    return auth;
  });
  showThemeOptions: Signal<boolean> = computed(() => this.themeService.showOptions());
  constructor(
    private authService: AuthService,
    private authAdmin: AuthAdmin,
    private authDoctor: AuthDoctor,
    private router: Router,
    private photo: PhotoService,
    private themeService: ThemeService,
  ) {
    this.logo = this.photo.static.logo1;
  }
  ngAfterViewInit(): void {
    document.addEventListener('click', (event) => {
      if (this.authService.authView() === 'authorized') {
        if (event.target === this.userModeSwitcher.nativeElement) {
          this.themeService.showOptions.set(false);
        }
      }
    });
  }

  adminImage: Signal<string | null> = computed(() => {
    let img = this.authAdmin.adminInfo()?.image;
    if (img) return img;
    return null;
  });

  async getModesOptions() {
    const modesCom = await import('../modes-component/modes-component').then(
      (c) => c.ModesComponent,
    );
    this.myModes.clear();
    this.myModes.createComponent(modesCom);
  }

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
