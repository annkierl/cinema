import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Movie, Price } from '../home/showing/Showings/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminFilmHelperService {
  private http = inject(HttpClient);
  private showswithFilms$$ = new BehaviorSubject<showsWithFilms[]>([]);
  private durationOfFilm$$ = new BehaviorSubject<{ durationOfFilm: string }>({ durationOfFilm: '' });

  get duarionOfFilm$() {
    return this.durationOfFilm$$.asObservable();
  }

  get showswithFilms$() {
    return this.showswithFilms$$.asObservable();
  }

  insertdurationOfFilm(duration: string) {
    return this.durationOfFilm$$.next({ durationOfFilm: duration });
  }

  getShowsWithFilms(dayId: string, screenId: string) {
    return this.http
      .get<showsWithFilms[]>(`http://localhost:3000/show?dateId=${dayId}&screenId=${screenId}&_expand=movie`)
      .subscribe(number => this.showswithFilms$$.next(number));
  }

  compareHours(hour: string) {
    let InputTimeStart = new Date('1970-01-01T' + hour);
    let inputTimeStartArray = hour.split(':');
    let letInputTimeStartHOUR = Number(inputTimeStartArray[0]);
    let letInputTimeStartMIN = Number(inputTimeStartArray[1]);
    let generalResult: boolean = true;

    return combineLatest([this.duarionOfFilm$, this.showswithFilms$]).pipe(
      map(([durationOfChoosenFilm, filmsInRoom]) => {
        let DurationOfChosenFILM = Number(durationOfChoosenFilm.durationOfFilm);
        let addToH = Math.round(DurationOfChosenFILM / 60);
        let InputFilmWillEnd = letInputTimeStartHOUR + addToH;
        let EndOfFilm = InputFilmWillEnd.toString() + ':' + letInputTimeStartMIN.toString();
        let InputTimeEnd = new Date('1970-01-01T' + EndOfFilm);

        filmsInRoom.forEach(element => {
          let startHourEXISTINGFILM = new Date('1970-01-01T' + element.hour);
          let starthour = element.hour;
          let startTimeInArray = starthour.split(':');
          let StartHour = Number(startTimeInArray[0]);
          let Startminutes = Number(startTimeInArray[1]);
          let durationOfExistingFilm = Number(element.movie.length);
          let addToH = Math.round(durationOfExistingFilm / 60);
          let resH = StartHour + addToH;
          let end = resH.toString() + ':' + Startminutes.toString();
          let endHouurEXISTINFGILM = new Date('1970-01-01T' + end);
          if (!(InputTimeEnd < startHourEXISTINGFILM || endHouurEXISTINFGILM < InputTimeStart)) {
            generalResult = true;
          } else {
            generalResult = false;
          }
        });
        return generalResult;
      })
    );
  }
}

export interface showsWithFilms {
  id: number;
  hour: string;
  screenId: number;
  reservedSeats: number[][];
  priceList: Price[];
  movieId: number;
  dateId: number;
  screen: Screen;
  movie: Movie;
}
