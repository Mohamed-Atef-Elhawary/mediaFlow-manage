import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../services/theme-service';

@Component({
  selector: 'app-admin-sidebar',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebar {
  dashIcon = faHouse;
  appoitIcon = faCalendarDays;
  addIcon = faSquarePlus;
  listIcon = faUserGroup;
  themeIcon = faCircleHalfStroke;
  constructor(private themeService: ThemeService) {}
  showModeOptions() {
    this.themeService.showOptions.set(true);
  }
}
