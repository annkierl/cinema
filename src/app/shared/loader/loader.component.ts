import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoaderService } from '@shared/interceptor/loaderhandler.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading$ | async">
      <div class="loader">
        <img src="./assets/cinema.svg" alt="ładowanie, proszę czekać" />
        <p>Ładowanie...</p>
      </div>
    </div>
  `,
  styleUrls: ['./loader.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  private loaderService = inject(LoaderService);
  isLoading$ = this.loaderService.isLoading$;
}
