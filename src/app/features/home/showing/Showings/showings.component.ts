import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { CalendarService } from './calendar/calendar.service';
import { ShowingsService } from './showings.service';
@Component({
  selector: 'app-main',
  templateUrl: './showings.html',
  styleUrls: ['./showings.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowingsComponent {
  showingService = inject(ShowingsService);
  router = inject(Router);
  calendarService = inject(CalendarService);
  errorService = inject(ErrorhandlerService);

  errorClientServer$ = this.errorService.error$;

  ShowRepertoir(id: string) {
    this.calendarService.updateCurrentDay(Number(id));
    this.showingService.checkFilmsForAnotherDays(id);
    this.router.navigate(['/shows', id]);
    if (id == '0') {
      this.calendarService.blockedPassedHours('locked');
    } else {
      this.calendarService.blockedPassedHours(id);
    }
  }
}
