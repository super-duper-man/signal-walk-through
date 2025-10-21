import { Component, inject, input, linkedSignal, resource, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact-component',
  imports: [MatFormField, MatInputModule, FormsModule, MatProgressSpinner, MatButtonModule],
  template: `
    <div class="container">
      <h2>Edit Contact</h2>
      <form (ngSubmit)="editContact()">
        <div class="fields">
          <mat-form-field>
            <mat-label>Name</mat-label>
            <input matInput [(ngModel)]="name" name="name" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="email" name="email" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Phone</mat-label>
            <input matInput [(ngModel)]="phone" name="phone" />
          </mat-form-field>
        </div>

        <div class="actions">
          <button type="submit" mat-flat-button>Save</button>
          <button type="button" mat-raised-button routerLink="/">Cancel</button>
        </div>
      </form>
      @if(saving()){
      <mat-progress-spinner mode="indeterminate" />
      }
    </div>
  `,
  styles: `
   .container {
    padding: 16px
  }
    .fields {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;

    }
    .actions {
      display: flex;
      gap: 16px;
      justify-content: start;
    }
    `,
})
export class EditContactComponent {
  id = input.required<string>();
  ngOnInit() {
    console.info({ id: this.id() });
  }
  private apiService = inject(ApiService);
  private router = inject(Router);

  name = linkedSignal(() => this.contactResource.value()?.name);
  email = linkedSignal(() => this.contactResource.value()?.email);
  phone = linkedSignal(() => this.contactResource.value()?.phone);
  saving = signal(false);

  contactResource = resource({
    params: () => ({ id: this.id() }),
    loader: async ({ params }) => await this.apiService.getContact(String(params.id)),
  });

  async editContact() {
    this.saving.set(true);
    await this.apiService.updateContact({
      id: this.id(),
      email: String(this.email()),
      name: String(this.name()),
      phone: String(this.phone()),
    });
    this.saving.set(false);
    this.router.navigateByUrl('/');
  }
}
