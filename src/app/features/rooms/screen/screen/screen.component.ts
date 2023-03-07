import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderInterceptor } from '@shared/interceptor/loader-interceptor.interceptor';
import { LoaderComponent } from '@shared/loader/loader.component';
import { ShowsService } from 'src/app/features/home/showing/Showings/film-lists/shows/shows.service';
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
  private showsService = inject(ShowsService);
  private route = inject(ActivatedRoute);
  private errorService = inject(ErrorhandlerService);

  choosenShowWithMovie$ = this.showsService.choosenShowWithMovie$;
  ShowId = this.route.snapshot.params['id'];
  show$ = this.screenService.show$;
  errorClientServer$ = this.errorService.error$;
  singleMovieProp$ = this.screenService.filmProp$;

  constructor() {
    this.screenService.getShow(this.ShowId);
  }

  ngOnInit() {
    let param = this.route.snapshot.url[1].path;
    this.showsService.getParticularShowWithMovieData(Number(param));
  }
}
