import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, RouterLinkWithHref, MatIcon],
  template: `
    <mat-toolbar
      >Welcome to {{ title() }}!
      <button mat-icon-button routerLink="/add">
        <mat-icon>add_circle</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet />
  `,
  styles: [
 `
      @use '@angular/material' as mat;

      mat-toolbar {
        justify-content: space-between;

        @include mat.toolbar-overrides(
          (
            container-background-color: var(--mat-sys-primary),
            container-text-color: var(--mat-sys-on-primary),
          )
        );

        @include mat.icon-button-overrides(
          (
            icon-color: var(--mat-sys-on-primary),
          )
        );
      }

      .container {
        position: relative;
      }
    `
  ],
})
export class App {
  protected readonly title = signal('signal-walk-through');
}
