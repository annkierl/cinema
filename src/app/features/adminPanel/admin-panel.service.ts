import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Film, Movie, Shows } from '../home/showing/Showings/interfaces';
import { RepertoirActions, ShowActions } from './admin-store/admin.actions';
import { RepertoirState } from './admin.component';

@Injectable({
  providedIn: 'root',
})
export class AdminPanelService {
  private http = inject(HttpClient);
  private store = inject<Store<RepertoirState>>(Store);

  getRepertoir() {
    return this.http.get<Movie[]>('http://localhost:3000/movies');
  }

  getShows(id: ShowsIds) {
    return this.http.get<Shows[]>(`http://localhost:3000/show?dateId=${id.dayId}&screenId=${id.screenId}`);
  }

  addFilm(film: Movie) {
    return this.http.post('http://localhost:3000/movies', film);
  }

  // addShow(: Shows) {
  //   return this.http.post('http://localhost:3000/movies', film);
  // }

  addShow(show: Shows) {
    return this.http.post('http://localhost:3000/show', show);
  }
  ngOnInit() {
    // this.store.dispatch(RepertoirActions.getfilms());
    // this.store.dispatch(ShowActions.getshows());
    // this.adminHelperService.getNumerOfFilms();
    // this.store.subscribe(val => console.log(val));
  }
}
export interface ShowsIds {
  dayId: number;
  screenId: number;
}
