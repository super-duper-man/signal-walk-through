import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, RouterLinkWithHref],
  template: `
    <div class="container">
      <h2>Add Contact</h2>
      <form>
        <div class="fields">
          <mat-form-field>
            <mat-label>Name</mat-label>
            <input matInput />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Email</mat-label>
            <input matInput />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Phone</mat-label>
            <input matInput />
          </mat-form-field>
        </div>

        <div class="actions">
          <button mat-flat-button>Save</button>
          <button mat-raised-button routerLink="/">Cancel</button>
        </div>
      </form>
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
export class AddContactComponent {}
