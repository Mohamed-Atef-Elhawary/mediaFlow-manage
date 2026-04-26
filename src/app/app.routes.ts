import { Routes } from '@angular/router';
import { outerGuard } from './guards/outer-guard';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
  {
    path: 'outer',
    loadComponent: () => import('./pages/outer-page/outer-page').then((c) => c.OuterPage),
    canActivate: [outerGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((c) => c.Login),
    canActivate: [loginGuard],
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin-layout/admin-layout').then((c) => c.AdminLayout),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/adminComponents/admin-dashboard/admin-dashboard').then(
            (c) => c.AdminDashboard,
          ),
        title: 'dashboard',
      },
      {
        path: 'appointment',
        loadComponent: () =>
          import('./components/adminComponents/admin-appointments/admin-appointments').then(
            (c) => c.AddminAppoinments,
          ),
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./components/adminComponents/doctor-list/doctor-list').then((c) => c.DoctorList),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./components/adminComponents/add-doctor/add-doctor').then((c) => c.AddDoctor),
      },
    ],
  },

  {
    path: 'doctor',
    loadComponent: () => import('./pages/doctor-layout/doctor-layout').then((c) => c.DoctorLayout),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/doctorComponents/doctor-dashboard/doctor-dashboard').then(
            (c) => c.DoctorDashboard,
          ),
      },

      {
        path: 'appointment',
        loadComponent: () =>
          import('./components/doctorComponents/doctor-appointments/doctor-appointments').then(
            (c) => c.DoctorAppointments,
          ),
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./components/doctorComponents/doctor-profile/doctor-profile').then(
            (c) => c.DoctorProfile,
          ),
      },
    ],
  },
];
