import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DiscountValidatorService } from './discountValidator.service';

describe('OrderDiscountCodeService', () => {
  const mockCoupon = [
    {
      id: 2,
      code: '111',
      discount: 5,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [DiscountValidatorService],
      imports: [HttpClientTestingModule],
    });
  });

  it('is code valid', done => {
    const expectedUrl = 'http://localhost:3000/discount?code=111';
    const service = TestBed.inject(EnvironmentInjector).get(DiscountValidatorService);
    const httpController = TestBed.inject(HttpTestingController);

    service.checkDiscount('111').subscribe({
      next: result => {
        expect(result).toEqual(true);
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual('Error');
        done();
      },
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush(mockCoupon);
  });
});
