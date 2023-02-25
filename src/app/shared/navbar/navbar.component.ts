import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  menu = false;
  auth$ = this.authService.auth$;

  logout() {
    this.authService.logout();
  }

  showMenu() {
    this.menu = !this.menu;
  }

  logIn() {
    this.router.navigate(['/auth']);
  }

  gotoMain() {
    this.router.navigate(['/shows/0']);
  }
  goToWishList() {
    this.router.navigate(['/wishList']);
  }

  gotoMyTickets() {
    this.router.navigate(['/myTickets']);
  }
}
