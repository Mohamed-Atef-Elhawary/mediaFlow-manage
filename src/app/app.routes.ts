import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'outer', pathMatch: 'full' },
  {
    path: 'outer',
    loadComponent: () => import('./pages/outer-page/outer-page').then((c) => c.OuterPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((c) => c.Login),
  },
];
