import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from 'src/app/features/auth/token/token.service';
import { ShowingsService } from '../../../showings.service';
import { initialStateJudge, Judge } from './judge-interface';

@Injectable({
  providedIn: 'root',
})
export class JudgeService {
  private judge$$ = new BehaviorSubject<Judge>(initialStateJudge);
  private movieId$$ = new BehaviorSubject<{ movieId: number }>({ movieId: 0 });
  private wasJudged$$ = new BehaviorSubject<{ boolean: boolean }>({ boolean: false });
  private http = inject(HttpClient);
  private showingService = inject(ShowingsService);
  private tokenService = inject(TokenService);
  private userId = this.tokenService.decodeUserToken();

  get judge$() {
    return this.judge$$.asObservable();
  }

  get movieId$() {
    return this.movieId$$.asObservable();
  }

  get wasJudged$() {
    return this.wasJudged$$.asObservable();
  }

  getJudgedFilms() {
    this.http.get<Judge>(`http://localhost:3000/judged2/1`).subscribe(judge => this.judge$$.next(judge));
  }

  postJudgedFilm(filmId: number) {
    const previousUserJudnedFilms = this.judge$$.value.movieId;
    this.http
      .patch(`http://localhost:3000/judged2/1`, {
        movieId: [...previousUserJudnedFilms, filmId],
      })
      .subscribe(judge => this.getJudgedFilms());
  }

  setMovieId(movieId: number) {
    this.movieId$$.next({ movieId });
  }
  changeStatusOfJudge(boolean: boolean) {
    this.wasJudged$$.next({ boolean });
  }

  postFilmJudge(movieId: number, mark: number) {
    this.showingService.postNewScore(movieId, mark);
  }
}
