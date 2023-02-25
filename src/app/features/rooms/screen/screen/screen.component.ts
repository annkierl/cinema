import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { TicketsComponent } from 'src/app/features/tickets/tickets.component';
import { DisplayComponent } from './display/display.component';
import { ScreenService } from './screen.service';

@Component({
  selector: 'app-screen',
  imports: [CommonModule, DisplayComponent, TicketsComponent, LoaderComponent, ErrorComponent],
  standalone: true,
  templateUrl: './screen.html',
  styleUrls: ['./screen.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ScreenComponent {
  private screenService = inject(ScreenService);
  private route = inject(ActivatedRoute);
  private errorService = inject(ErrorhandlerService);

  ShowId = this.route.snapshot.params['id'];
  show$ = this.screenService.show$;
  errorClientServer$ = this.errorService.error$;
  singleMovieProp$ = this.screenService.filmProp$;

  constructor() {
    this.screenService.getShow(this.ShowId);
  }
}
