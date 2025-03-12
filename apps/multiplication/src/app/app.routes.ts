import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@classe-a-deux/home').then(c => c.HomeComponent),
  },
  {
    path: 'test',
    loadComponent: () => import('@classe-a-deux/test').then(c => c.TableMultiplicationComponent),
  },
  {
    path: 'result',
    loadComponent: () => import('@classe-a-deux/result').then(c => c.ResultComponent),
  },
];
