import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { CalendarService } from './calendar/calendar.service';
import { ShowsService } from './film-lists/shows/shows.service';
import { ShowingsService } from './showings.service';
@Component({
  selector: 'app-main',
  templateUrl: './showings.html',
  styleUrls: ['./showings.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowingsComponent {
  private showingService = inject(ShowingsService);
  private showsSevice = inject(ShowsService);
  private router = inject(Router);
  private errorService = inject(ErrorhandlerService);

  calendarService = inject(CalendarService);
  calendar$ = this.calendarService.calendar$;
  errorClientServer$ = this.errorService.error$;

  ShowRepertoir(id: string) {
    this.calendarService.updateCurrentDay(Number(id));
    this.showingService.checkFilmsForAnotherDays(id);
    this.showsSevice.getShowsSetForDay(Number(id)); // DODAŁĄM TO
    this.router.navigate(['/shows', id]);
    if (id == '0') {
      this.calendarService.blockedPassedHours('locked');
    } else {
      this.calendarService.blockedPassedHours(id);
    }
  }
}
