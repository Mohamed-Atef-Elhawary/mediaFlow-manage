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
    ],
  },

  {
    path: 'doctor',
    loadComponent: () => import('./pages/doctor-layout/doctor-layout').then((c) => c.DoctorLayout),
  },
];
