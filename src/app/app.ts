import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('mediaFlow-manage');
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    if (this.authService.authView() === 'outer') {
      this.router.navigate(['/outer']);
    }
  }
  ngOnInit() {
    console.log(this.authService.authView());
  }
}
