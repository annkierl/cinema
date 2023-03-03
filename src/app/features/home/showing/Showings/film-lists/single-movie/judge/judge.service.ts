import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from 'src/app/features/auth/token/token.service';
import { ShowingsService } from '../../../showings.service';
import { initialStateJudge, Judge } from './judge-interface';
import { JudgeComponent } from './judge.component';

@Injectable({
  providedIn: 'root',
})
export class JudgeService {
  private judge$$ = new BehaviorSubject<Judge>(initialStateJudge);
  private movieId$$ = new BehaviorSubject<{ movieId: number }>({ movieId: 0 });
  private wasJudged$$ = new BehaviorSubject<{ boolean: boolean }>({ boolean: false });
  private http = inject(HttpClient);
  private showingService = inject(ShowingsService);

  get judge$() {
    return this.judge$$.asObservable();
  }

  get movieId$() {
    return this.movieId$$.asObservable();
  }

  get wasJudged$() {
    return this.wasJudged$$.asObservable();
  }

  postJudgeMovie(movieId: number, dayId: number) {
    this.http
      .patch(`http://localhost:3000/movies/${movieId}`, {
        canBeJudged: false,
      })
      .subscribe(val => this.showingService.checkFilmsForAnotherDays(`${dayId}`)); // geta na movie
  }

  // postJudgedFilm(filmId: number) {
  //   const previousUserJudnedFilms = this.judge$$.value.movieId;
  //   this.http.patch(`http://localhost:3000/judged2/1`, {
  //     movieId: [...previousUserJudnedFilms, filmId],
  //   });
  // }

  setMovieId(movieId: number) {
    this.movieId$$.next({ movieId });
  }
  changeStatusOfJudge(boolean: boolean) {
    this.wasJudged$$.next({ boolean });
  }

  postFilmJudge(movieId: number, mark: number) {
    this.showingService.postNewScore(movieId, mark);
  }

  judgeOpenDialog(judgedMovie: number[], movieId: number) {
    // let isJudged = judgedMovie.some(element => element === movieId);
    // if (isJudged) {
    //   this.changeStatusOfJudge(true);
    // }
    this.setMovieId(movieId);
  }
}
