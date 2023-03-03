import { TestBed } from '@angular/core/testing';
import { DiscountService } from './discount.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvironmentInjector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
describe('DiscountService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [DiscountService],
      imports: [HttpClientTestingModule],
    });
  });

  it('get discounts', done => {
    //arrange
    const expectedUrl = 'http://localhost:3000/discount';
    const service = TestBed.inject(EnvironmentInjector).get(DiscountService);
    const httpController = TestBed.inject(HttpTestingController);

    //act
    service.getDiscountCodes().subscribe({
      next: res => {
        expect(res).toEqual([]); //wynik fałszywego zapytania
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual('Error');
        done();
      },
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush([]); // fałszywe zapytanie do API
  });

  it('remove discount', done => {
    //arrange
    const expectedUrl = 'http://localhost:3000/discount/5';
    const service = TestBed.inject(EnvironmentInjector).get(DiscountService);
    const httpController = TestBed.inject(HttpTestingController);

    //act
    service.removeDiscount1(5).subscribe({
      next: res => {
        expect(res).toEqual([]); //wynik fałszywego zapytania
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual('Error');
        done();
      },
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush([]); // fałszywe zapytanie do API
  });
});
