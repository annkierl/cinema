import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CalendarService } from '../calendar/calendar.service';
import { ShowingsService } from '../showings.service';
import { ShowsService } from './shows/shows.service';
import { JudgeService } from './single-movie/judge/judge.service';

@Component({
  selector: 'app-filmlists',
  templateUrl: './film-lists.html',
  styleUrls: ['./film-lists.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmListsComponent {
  id!: number;

  private showingService = inject(ShowingsService);
  private showsService = inject(ShowsService);
  private calendarService = inject(CalendarService);
  private judgeService = inject(JudgeService);

  judge$ = this.judgeService.judge$;
  currentDay$ = this.calendarService.currentDay$;
  films$ = this.showingService.filmList$;
  scores$ = this.showingService.score$;
  shows$ = this.showsService.shows$;
  wantToWatchButton$ = this.showingService.wantToWatchButton$;

  ngOnInit() {
    this.showingService.getScores();
  }
}
