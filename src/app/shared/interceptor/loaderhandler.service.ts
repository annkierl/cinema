import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading$$ = new BehaviorSubject(false);
  private jobs: number[] = [];

  get isLoading$() {
    return this.isLoading$$.asObservable();
  }

  show() {
    this.jobs.push(0);
    this.isLoading$$.next(true);
  }

  hide() {
    this.jobs.pop();
    if (this.jobs.length === 0) {
      this.isLoading$$.next(false);
    }
  }
}
