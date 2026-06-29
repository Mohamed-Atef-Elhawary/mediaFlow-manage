import { Component, computed } from '@angular/core';

import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  constructor(private auth: AuthService) {}

  display = computed(() => this.auth.authView() === 'authorized');
}
