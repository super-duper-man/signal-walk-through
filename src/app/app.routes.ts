import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/contact-list-component/contact-list.component').then(
      (c) => c.ContactListComponent
    ),
    pathMatch: 'full'
  },
];
