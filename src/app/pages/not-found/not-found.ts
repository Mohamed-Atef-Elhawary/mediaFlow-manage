import { Component } from '@angular/core';
import { PhotoService } from '../../services/photoservice';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  notFoundImg: string;
  constructor(private photo: PhotoService) {
    this.notFoundImg = this.photo.static.notFound;
  }
}
