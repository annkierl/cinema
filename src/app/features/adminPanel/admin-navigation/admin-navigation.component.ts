import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-navigation.html',
  styleUrls: ['./admin-navigation.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminNavigationComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
  goToSeans() {
    this.router.navigate(['/admin/showing']);
  }

  goToAddFilm() {
    this.router.navigate(['/admin/films']);
  }
  ngOnInit() {}
}
