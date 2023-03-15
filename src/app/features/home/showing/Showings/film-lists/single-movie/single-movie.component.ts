import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { map } from 'rxjs';
import { WishListService } from 'src/app/features/wishList/wish-list.service';
import { Film, Score } from '../../interfaces';
import { ShowingsService } from '../../showings.service';
import { MatDialog } from '@angular/material/dialog';
import { JudgeComponent } from './judge/judge.component';
import { JudgeService } from './judge/judge.service';
import { ShowsService } from '../shows/shows.service';
import { Judge } from './judge/judge-interface';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.html',
  styleUrls: ['./single-movie.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleMovieComponent {
  @Input() singleMovie!: Film;
  @Input() scores!: Score[];
  @Input() currentDay!: { id: number };
  @Input() judge!: Judge;
  @Input() wantToWatchToggle!: { wantoWatch: string };

  private showingService = inject(ShowingsService);
  private showsSevice = inject(ShowsService);
  private wishListService = inject(WishListService);
  private judgeService = inject(JudgeService);
  private dialog = inject(MatDialog);

  wishList$ = this.wishListService.wishList$;
  wantToWatchButton$ = this.showingService.wantToWatchButton$;
  isShown = false;

  constructor() {
    this.setWantToWatchButton();
  }

  setWantToWatchButton() {
    this.wantToWatchButton$ = this.wishList$.pipe(
      map(val => {
        const exist = val.some(element => {
          return element.movieId === this.singleMovie.movieId;
        });
        if (exist) {
          return { wantoWatch: 'Usuń z listy' };
        } else {
          return { wantoWatch: 'Dodaj do listy' };
        }
      })
    );
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    judgedMovie: number[],
    movieId: number
  ): void {
    this.dialog.open(JudgeComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    this.judgeService.judgeOpenDialog(judgedMovie, movieId);
  }

  ShowMoreLess() {
    this.isShown = !this.isShown;
  }

  toggleWantToWatch(movieId: number, movieTitle: string, wantToWatchToggle: string) {
    if (wantToWatchToggle === 'Usuń z listy') {
      this.showingService.wantToWatchAdd();
      this.wishListService.removeMovie(movieId);
    } else {
      this.showingService.wantToWatchRemove();
      this.wishListService.addMovieToList(movieId, movieTitle);
    }
  }

  ngOnInit() {
    this.showsSevice.getShowsSetForDay(this.currentDay.id);
  }
}
