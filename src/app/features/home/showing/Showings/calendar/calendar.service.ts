import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { date } from '../interfaces';
import { prepairCalendar } from './calendar.helper';
@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  date = prepairCalendar();
  private http = inject(HttpClient);
  private calendar$$ = new BehaviorSubject<date[]>([]);
  private blockedPassedHours$$ = new BehaviorSubject<string>('locked');
  private chosenDay$$ = new BehaviorSubject<{ id: number }>({ id: 0 });

  constructor() {
    this.http.get<date[]>('http://localhost:3000/dates').subscribe(dates => this.calendar$$.next(dates));
  }

  get calendar$() {
    return this.calendar$$.asObservable();
  }
  get blockedPassedHours$() {
    return this.blockedPassedHours$$.asObservable();
  }
  get currentDay$() {
    return this.chosenDay$$.asObservable();
  }

  blockedPassedHours(id: string) {
    this.blockedPassedHours$$.next(id);
  }
  updateCurrentDay(id: number) {
    this.chosenDay$$.next({ id: id });
  }

  ifTimeIsPassed(time: string) {
    const currentDate = new Date();
    let currentTime = currentDate.getHours() + ':' + currentDate.getMinutes();
    if (currentTime.length <= 4) {
      currentTime = '0' + currentTime;
    }
    return time > currentTime ? false : true;
  }
}
