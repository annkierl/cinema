import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Film, Score, Shows } from './interfaces';
import { initialFilms } from './film-lists/itinital-state';
import { ShowsService } from './film-lists/shows/shows.service';

@Injectable({
  providedIn: 'root',
})
export class ShowingsService {
  private filmsList$$ = new BehaviorSubject<Film[]>([initialFilms]);
  private score$$ = new BehaviorSubject<Score[]>([{ id: 0, score: [] }]);
  private wantToWatch$$ = new BehaviorSubject<string>('');
  private http = inject(HttpClient);

  constructor() {
    this.http
      .get<Film[]>(`http://localhost:3000/films?dateId=0&_expand=movie`)
      .subscribe(films => this.filmsList$$.next(films));
  }

  get score$() {
    return this.score$$.asObservable();
  }

  getScores() {
    this.http.get<Score[]>(`http://localhost:3000/score`).subscribe(score => this.score$$.next(score));
  }

  postNewScore(movieId: number, mark: number) {
    const previousMarks = this.score$$.value[movieId - 1].score;
    this.http.delete(`http://localhost:3000/score/${movieId}`).subscribe(value => this.getScores());

    this.http
      .post(`http://localhost:3000/score`, {
        id: movieId,
        score: [...previousMarks, mark],
      })
      .subscribe(value => this.getScores());
  }

  get filmList$() {
    return this.filmsList$$.asObservable();
  }

  postFilms(movieId: number, dayId: number) {
    this.http.post(`http://localhost:3000/films`, { id: 14, movieId: movieId, dateId: dayId }).subscribe();
  }
  checkFilmsForAnotherDays(id: string) {
    this.http
      .get<Film[]>(`http://localhost:3000/films?dateId=${id}&_expand=movie`)
      .subscribe(films => this.filmsList$$.next(films));
  }
  wantToWatchAdd() {
    return this.wantToWatch$$.next('Dodaj do listy');
  }

  wantToWatchRemove() {
    return this.wantToWatch$$.next('Usuń z listy');
  }
  get wantToWatchButton$() {
    return this.wantToWatch$$.asObservable();
  }
}
