import { Component, computed, Signal, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { AuthService } from './services/auth-service';
import { AuthType } from './types/AuthType';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('mediaFlow-manage');
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    // if (this.authService.authView() === 'outer') {
    //   this.router.navigate(['/outer']);
    // } else if (this.authService.authView() === 'authorized') {
    //   if (this.authService.authLogger() === 'admin') {
    //     this.router.navigate(['/admin']);
    //   }
    // }
  }
  view: Signal<AuthType> = computed(() => this.authService.authView());

  ngOnInit() {
    console.log(this.view());
    if (this.view() === 'outer') {
      this.router.navigate(['/outer']);
    } else if (this.view() === 'authorized') {
      if (this.authService.authLogger() === 'admin') {
        this.router.navigate(['/admin']);
      } else if (this.authService.authLogger() === 'doctor') {
        this.router.navigate(['/doctor']);
      }

      this.authService.authView.set('logged');
    }
  }
}
