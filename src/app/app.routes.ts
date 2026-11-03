import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'CampusCode – Hackathon Arena',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
  { path: 'login', title: 'Log in – CampusCode',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent) },
  { path: 'register', title: 'Register – CampusCode',
    loadComponent: () => import('./pages/register/register.component').then((m) => m.RegisterComponent) },
  { path: '**', redirectTo: '' },
];
