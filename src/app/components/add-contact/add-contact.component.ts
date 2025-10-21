import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-contact',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, RouterLinkWithHref, FormsModule, MatProgressSpinner],
  template: `
    <div class="container">
      <h2>Add Contact</h2>
      <form (ngSubmit)="addContact()">
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
export class AddContactComponent {
  private apiService = inject(ApiService);
  private router = inject(Router);

  name = signal('');
  email = signal('');
  phone = signal('');
  saving = signal(false);

  async addContact() {
    this.saving.set(true);
    await this.apiService.addContact({
      id: '123dasd',
      name: this.name(),
      email: this.email(),
      phone: this.phone(),
    });
    this.saving.set(false);
    this.router.navigateByUrl('/');
  }
}
