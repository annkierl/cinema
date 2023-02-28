import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from '../calendar/calendar.service';
import { ShowingsService } from '../showings.service';
import { ShowsService } from './shows/shows.service';

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

  currentDay$ = this.calendarService.currentDay$;
  showings = this.showingService.filmList$;
  scores$ = this.showingService.score$;
  shows$ = this.showsService.shows$;

  ngOnInit() {
    this.showingService.getScores();
  }
}
