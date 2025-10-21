import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/contact-list-component/contact-list.component').then(
        (c) => c.ContactListComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-contact/add-contact.component').then((c) => c.AddContactComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/edit-contact-component/edit-contact.component').then(
      (c) => c.EditContactComponent
    ),
  },
];
