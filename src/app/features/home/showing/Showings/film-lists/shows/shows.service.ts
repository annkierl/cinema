import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { initialShowWithMovie, Shows, ShowWithMovie } from '../../interfaces';
import { initialShows } from '../itinital-state';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  private shows$$ = new BehaviorSubject<Shows[]>([initialShows]);
  private choosenShowWithMovie$$ = new BehaviorSubject<ShowWithMovie>(initialShowWithMovie);
  private http = inject(HttpClient);

  get shows$() {
    return this.shows$$.asObservable();
  }

  get choosenShowWithMovie$() {
    return this.choosenShowWithMovie$$.asObservable();
  }

  getShowsSetForDay(dayId: number) {
    this.http.get<Shows[]>(`http://localhost:3000/show?dayId=${dayId}`).subscribe(shows => this.shows$$.next(shows));
  }

  getParticularShowWithMovieData(id: number) {
    this.http
      .get<ShowWithMovie>(`http://localhost:3000/show/${id}?_expand=movie`)
      .subscribe(show => this.choosenShowWithMovie$$.next(show));
  }

  updateShow(newShow: Shows[]) {
    this.shows$$.next(newShow);
  }
}
