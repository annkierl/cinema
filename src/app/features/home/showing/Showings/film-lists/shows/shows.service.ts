import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShowEffects } from 'src/app/features/adminPanel/admin-store/admin.effects';
import { Shows } from '../../interfaces';
import { initialShows } from '../itinital-state';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  private shows$$ = new BehaviorSubject<Shows[]>([initialShows]);
  private http = inject(HttpClient);

  get shows$() {
    return this.shows$$.asObservable();
  }

  getShowsSetForDay(dayId: number) {
    this.http.get<Shows[]>(`http://localhost:3000/show?dayId=${dayId}`).subscribe(shows => this.shows$$.next(shows));
  }

  updateShow(newShow: Shows[]) {
    this.shows$$.next(newShow);
  }
}
