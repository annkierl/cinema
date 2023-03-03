import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Blik } from './payment-form/blik.interface';

@Injectable({
  providedIn: 'root',
})
export class FormPaymentService {
  private http = inject(HttpClient);

  private canPay$$ = new BehaviorSubject<{ canPay: boolean }>({ canPay: false });
  private blik$$ = new BehaviorSubject<Blik[]>([]);

  get canPay$() {
    return this.canPay$$.asObservable();
  }

  sendPayment(code: number) {
    this.http.post('http://localhost:3000/blik', { code: code }).subscribe(val => console.log(val));
  }

  goToPayment() {
    this.canPay$$.next({ canPay: true });
  }

  blockPayment() {
    this.canPay$$.next({ canPay: false });
  }
}
