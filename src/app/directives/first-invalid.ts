import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFirstInvalid]',
})
export class FirstInvalid {
  constructor(private ele: ElementRef) {}

  @HostListener('submit') onSubmit() {
    let firstInv = this.ele.nativeElement.querySelector(
      'input.ng-invalid, select.ng-invalid, textarea.ng-invalid',
    );
    if (firstInv) {
      // firstInv.focus();
      firstInv.focus({ preventScroll: true });

      const rect = firstInv.getBoundingClientRect();
      const isInViewport =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);

      if (!isInViewport) {
        firstInv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
}
