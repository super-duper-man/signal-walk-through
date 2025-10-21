import { Component, computed, inject, resource, signal } from '@angular/core';
import {
  MatList,
  MatListItem,
  MatListItemTitle,
  MatListItemLine,
  MatListItemMeta,
} from '@angular/material/list';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { Contact } from '../../models/contact.model';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-contact-list-component',
  imports: [
    MatList,
    MatListItem,
    MatListItemTitle,
    MatListItemLine,
    MatProgressSpinner,
    MatListItemMeta,
    MatButtonModule,
    MatIcon,
    RouterLink
],
  template: `
    <mat-list>
      @for (contact of contactsResource.value(); track contact.id) {
      <mat-list-item class="container">
        <h3 matListItemTitle>{{ contact.name }}</h3>
        <p matListItemLine>{{ contact.email }}</p>
        <div matListItemMeta>
           <button mat-icon-button routerLink="/edit/{{contact.id}}">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button (click)="deleteContact(contact.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </mat-list-item>
      }
    </mat-list>

    @if(loading()){
    <mat-progress-spinner mode="indeterminate" />
    }
  `,
  styles: [
    `
      .container {
        padding: 0 5px;
      }
    `,
  ],
})
export class ContactListComponent {
  deleting = signal<boolean>(false);
  loading = computed(() => this.contactsResource.isLoading() || this.deleting());

  async deleteContact(id: string) {
    this.deleting.set(true);
    await this.apiService.deleteContact(id);
    this.deleting.set(false);
    this.contactsResource.reload();
  }
  private apiService = inject(ApiService);
  contactsResource = resource<Contact[], unknown>({
    loader: () => this.apiService.getContacts(),
  });
}
