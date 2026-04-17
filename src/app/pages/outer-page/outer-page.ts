import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PhotoService } from '../../services/photoservice';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-outer-page',
  imports: [RouterLink],
  templateUrl: './outer-page.html',
  styleUrl: './outer-page.css',
})
export class OuterPage {
  outerPhoto: string;
  constructor(
    private auth: AuthService,
    private photo: PhotoService,
  ) {
    this.outerPhoto = this.photo.static.outer;
  }
}
