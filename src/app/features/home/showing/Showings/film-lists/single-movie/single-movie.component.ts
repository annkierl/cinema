import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { TokenService } from 'src/app/features/auth/token/token.service';
import { WishListService } from 'src/app/features/wishList/wish-list.service';
import { Film, Score } from '../../interfaces';
import { ShowingsService } from '../../showings.service';
import { MatDialog } from '@angular/material/dialog';
import { JudgeComponent } from './judge/judge.component';
import { JudgeService } from './judge/judge.service';
import { ShowsService } from '../shows/shows.service';

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

  private showingService = inject(ShowingsService);
  private showsSevice = inject(ShowsService);
  private wishListService = inject(WishListService);
  private authService = inject(AuthService);
  private judgeService = inject(JudgeService);

  auth = this.authService.auth$;
  shows$ = this.showsSevice.shows$;
  wish$ = this.wishListService.wishList$;
  wishList$ = this.wishListService.wishList$;
  wantToWatchButton$ = this.showingService.wantToWatchButton$;
  judge$ = this.judgeService.judge$;

  isShown = false;
  wantToJudge = false;
  constructor(public dialog: MatDialog) {
    this.setWantToWatchButton();
  }
  setWantToWatchButton() {
    this.wantToWatchButton$ = this.wishList$.pipe(
      map(val => {
        const exist = val.some(element => {
          return element.movieId === this.singleMovie.id;
        });
        if (exist) {
          return 'Usuń z listy';
        } else {
          return 'Dodaj do listy';
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
    let isJudged = judgedMovie.some(element => element === movieId);
    if (isJudged) {
      this.judgeService.changeStatusOfJudge(true);
    }
    this.judgeService.setMovieId(movieId);
  }

  toggle() {
    this.isShown = !this.isShown;
  }

  ShowRepertoir(id: string) {
    this.showingService.checkFilmsForAnotherDays(id);
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
    this.judgeService.getJudgedFilms();
    this.showsSevice.getShowsSetForDay(this.currentDay.id);
  }
}
