import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-doctor-sidebar',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './doctor-sidebar.html',
  styleUrl: './doctor-sidebar.css',
})
export class DoctorSidebar {
  dashIcon = faHouse;
  appoitIcon = faCalendarDays;
  profileIcon = faUserGroup;
}
