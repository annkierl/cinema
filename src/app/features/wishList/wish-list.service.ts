import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { TokenService } from '../auth/token/token.service';
import { initialWishList, Wish } from './interface-wishList';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private wishList$$ = new BehaviorSubject<Wish[]>(initialWishList);
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private userId = this.tokenService.decodeUserToken();

  constructor() {
    this.getWishList();
  }

  getWishList() {
    return this.http
      .get<Wish[]>(`http://localhost:3000/wishList2`)
      .subscribe(wishlist => this.wishList$$.next(wishlist));
  }
  get wishList$() {
    return this.wishList$$.asObservable();
  }

  removeMovie(movieId: number) {
    this.http.delete<Wish>(`http://localhost:3000/wishList2/${movieId}`).subscribe(val => this.getWishList());
  }

  addMovieToList(movieId: number, movieTitle: string) {
    this.http
      .post(`http://localhost:3000/wishList2`, {
        id: movieId,
        movieId: movieId,
        movieTitle: movieTitle,
      })
      .subscribe(val => this.getWishList());
  }
}
