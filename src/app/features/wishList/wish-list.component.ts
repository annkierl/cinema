import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { WishListService } from './wish-list.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  templateUrl: './wishList.html',
  styleUrls: ['./wishList.scss'],
  imports: [CommonModule, LoaderComponent, ErrorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WishListComponent {
  private wishListService = inject(WishListService);

  errorService = inject(ErrorhandlerService);
  errorClientServer$ = this.errorService.error$;
  wishList$ = this.wishListService.wishList$;

  remove(movieId: number) {
    this.wishListService.removeMovie(movieId);
  }
}
