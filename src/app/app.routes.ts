import { Routes } from '@angular/router';
import { Home } from './home/home';
import { JobDetails } from './jobs/job-details/job-details';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadComponent: () => import('./home/home').then((c) => c.Home) },
  {
    path: 'job/:id',
    loadComponent: () => import('./jobs/job-details/job-details').then((c) => c.JobDetails),
  },
];
