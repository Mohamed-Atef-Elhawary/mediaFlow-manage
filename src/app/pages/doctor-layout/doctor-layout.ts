import { Component } from '@angular/core';
import { DoctorSidebar } from '../../components/doctorComponents/doctor-sidebar/doctor-sidebar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-doctor-layout',
  imports: [DoctorSidebar, RouterOutlet],
  templateUrl: './doctor-layout.html',
  styleUrl: './doctor-layout.css',
})
export class DoctorLayout {}
