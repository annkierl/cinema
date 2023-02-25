import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, of, switchMap, tap } from 'rxjs';
import {
  AdminAddHourForm,
  adminHour,
  AdminHourTypeForm,
} from '../admin-form/admin-show-form/admin-add-hour-show/admin-add-hour-show.interface';
import { Movie, Price } from '../home/showing/Showings/interfaces';
import { ShowsIds } from './admin-panel.service';
import { RepertoirState } from './admin.component';

@Injectable({
  providedIn: 'root',
})
export class AdminFilmHelperService {
  private http = inject(HttpClient);
  private store = inject<Store<RepertoirState>>(Store);
  private showswithFilms$$ = new BehaviorSubject<showsWithFilms[]>([]);
  numberOfFilms$$ = new BehaviorSubject<NumberOfFilms[]>([]);
  private durationOfFilm$$ = new BehaviorSubject<{ durationOfFilm: string }>({ durationOfFilm: '' });

  get numberOfFilms$() {
    return this.numberOfFilms$$.asObservable();
  }
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

  getNumerOfFilms() {
    return this.http
      .get<NumberOfFilms[]>('http://localhost:3000/numberOfFilms')
      .subscribe(number => this.numberOfFilms$$.next(number));
  }

  compareThis() {
    let InputTimeEkstr = new Date('1970-01-01T' + '14:30');
    let Input = new Date('1970-01-01T' + '10:12');
    console.log(InputTimeEkstr < Input);
  }

  compareHours(hour: string) {
    // let InputTimeStart = new Date('1970-01-01T' + hour);
    // console.log('InputSTART', InputTimeStart);

    // let inputTimeStartArray = hour.split(':');
    // let letInputTimeStartHOUR = Number(inputTimeStartArray[0]);
    // let letInputTimeStartMIN = Number(inputTimeStartArray[1]);

    // let InputTimeEkstr = new Date('1970-01-01T' + '14:30');
    let generalResult: boolean = false;
    return combineLatest([this.duarionOfFilm$, this.showswithFilms$]).pipe(
      map(([durationOfChoosenFilm, filmsInRoom]) => {
        // let DurationOfChosenFILM = Number(durationOfChoosenFilm.durationOfFilm);
        // let addToH = Math.round(DurationOfChosenFILM / 60);
        // let InputFilmWillEnd = letInputTimeStartHOUR + addToH;
        // let EndOfFilm = InputFilmWillEnd.toString() + ':' + letInputTimeStartMIN.toString();
        // let InputTimeEnd = new Date('1970-01-01T' + EndOfFilm);
        // console.log('inputEND', InputTimeEnd);
        // console.log('COMPARE', InputTimeStart < InputTimeEnd);

        filmsInRoom.map(element => {
          // let startHourEXISTINGFILM = new Date('1970-01-01T' + element.hour);
          // console.log('EX FILM START', startHourEXISTINGFILM);
          // let starthour = element.hour;
          // let startTimeInArray = starthour.split(':');
          // let StartHour = Number(startTimeInArray[0]);
          // let Startminutes = Number(startTimeInArray[1]);
          // let durationOfExistingFilm = Number(element.movie.length);
          // let addToH = Math.round(durationOfExistingFilm / 60);
          // let resH = StartHour + addToH;
          // let end = resH.toString() + ':' + Startminutes.toString();
          // let endHouurEXISTINFGILM = new Date('1970-01-01T' + end);
          // console.log('STOP EXISTINGFILM ', endHouurEXISTINFGILM);
          // console.log('HEJ', InputTimeEnd < startHourEXISTINGFILM);
          // if (!(InputTimeEnd < startHourEXISTINGFILM || endHouurEXISTINFGILM < InputTimeStart)) {
          //   generalResult = true;
          // } else {
          //   generalResult = false;
          // }
        });
        return generalResult;
      })
    );
  }
}
export interface NumberOfFilms {
  id: number;
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

interface controlValue {
  hour: string;
}
