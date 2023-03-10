import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ScreenService } from 'src/app/features/rooms/screen/screen/screen.service';
import { CalendarService } from '../../calendar/calendar.service';
import { ShowsService } from './shows.service';

export interface singleMovieProp {
  title: string;
  hour?: string;
  hall?: number;
  showId?: number;
  reservedSeats?: number[];
  dayId?: string;
}

@Component({
  selector: 'app-shows',
  templateUrl: './shows.html',
  styleUrls: ['./shows.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowsComponent {
  @Input() id!: number;
  @Input() singleMovieProp!: singleMovieProp[];
  private showsService = inject(ShowsService);
  private screenService = inject(ScreenService);

  calendarService = inject(CalendarService);

  currentDay$ = this.calendarService.currentDay$;
  currenValue$ = this.calendarService.blockedPassedHours$;
  showsList$ = this.showsService.shows$;

  chooseHour(showId: number, hour: string, screenId: number) {
    // this.showsService.getParticularShowWithMovieData(showId);
    this.screenService.getFilmProp({
      title: this.singleMovieProp[0].title,
      hour: hour,
      hall: screenId,
      showId: showId,
    });
    this.screenService.getShow(showId);
  }
}
