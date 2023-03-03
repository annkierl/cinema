import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TotalCostService {
  private TotalCost$$ = new BehaviorSubject<{ discount: number }>({ discount: 0 });

  get totalCost$() {
    return this.TotalCost$$.asObservable();
  }

  TotalCostDiscount() {
    return this.TotalCost$$.next({ discount: 5 });
  }
}
