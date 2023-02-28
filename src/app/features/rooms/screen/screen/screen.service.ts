import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Shows } from '../../../home/showing/Showings/interfaces';
import { BehaviorSubject, map } from 'rxjs';

import { initialShows, initialSingleMovieProp } from 'src/app/features/home/showing/Showings/film-lists/itinital-state';
import { singleMovieProp } from 'src/app/features/home/showing/Showings/film-lists/shows/shows.component';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private http = inject(HttpClient);
  private singleShow$$ = new BehaviorSubject<Shows>(initialShows);
  private singleMovieProp$$ = new BehaviorSubject<singleMovieProp>(initialSingleMovieProp);

  get show$() {
    return this.singleShow$$.asObservable();
  }

  get filmProp$() {
    return this.singleMovieProp$$.asObservable();
  }

  getShow(showId: number) {
    return this.http
      .get<Shows>(`http://localhost:3000/show/${showId}?_expand=screen`)
      .pipe(
        map(show => {
          let rows: number[] = [];
          let grid: number[][] = [];
          for (let i = 1; i < show.screen.colu + 1; i++) {
            rows.push(i);
          }
          for (let i = 0; i < show.screen.rows; i++) {
            grid.push(rows);
          }
          return { ...show, screenLayout: grid };
        })
      )
      .subscribe(show => this.singleShow$$.next(show));
  }

  reserveSeat(showId: number, reservedSeats: number[][], seatToReservation: number[][]) {
    return this.http
      .patch(`http://localhost:3000/show/${showId}`, {
        reservedSeats: [...reservedSeats, ...seatToReservation],
      })
      .subscribe(value => this.getShow(showId));
  }
  getFilmProp(singleMovieProp: singleMovieProp) {
    this.singleMovieProp$$.next(singleMovieProp);
  }

  removeSeat(reservedSeats: number[][], showId: number, removingSeat: number[]) {
    let filtrated = reservedSeats.filter(value => {
      return value[0] !== removingSeat[0] || value[1] !== removingSeat[1];
    });
    return this.http
      .patch(`http://localhost:3000/show/${showId}`, {
        reservedSeats: [...filtrated],
      })
      .subscribe(value => this.getShow(showId));
  }
}
