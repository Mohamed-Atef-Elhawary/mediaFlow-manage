import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  static = {
    outer: 'outer.png',
    logo: 'logo.png',
    logo1: 'logo1.png',
  };
}
