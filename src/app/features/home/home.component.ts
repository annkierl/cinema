import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<div class="main">
    <app-navbar></app-navbar>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
    <app-footer class="footer"></app-footer>
  </div> `,
  styleUrls: ['./home.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
