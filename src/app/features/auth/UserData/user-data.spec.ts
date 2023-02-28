import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { UserDataService } from './user-data.service';
import { UserDataStateService } from './user-data.service.state';
import { InitialUserData, User } from './user-initial';

describe('UserDataState', () => {
  const userDataMock = {
    getUserData(): Observable<User> {
      return of({
        id: 13,
        password: '222',
        firstName: 'Karol',
        lastName: 'Kowalski',
        phone: 22313,
        email: 'x.y@example.com',
      });
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [UserDataStateService, { provide: UserDataService, useValue: userDataMock }],
      imports: [HttpClientTestingModule],
    });
  });

  it('initial state', done => {
    const state = TestBed.inject(EnvironmentInjector).get(UserDataStateService);

    state.userData$.subscribe(result => {
      expect(result).toEqual(InitialUserData);
      done();
    });
  });

  it('upadeUserState', done => {
    //przygotowanie
    const service = TestBed.inject(EnvironmentInjector).get(UserDataStateService);
    const responseResult = {
      id: 13,
      password: '222',
      firstName: 'Karol',
      lastName: 'Kowalski',
      phone: 22313,
      email: 'x.y@example.com',
    };

    //wykonanie
    service.getUserDataUpdateState();

    //resultat
    service.userData$.subscribe(result => {
      expect(result).toEqual({
        id: 13,
        password: '222',
        firstName: 'Karol',
        lastName: 'Kowalski',
        phone: 22313,
        email: 'x.y@example.com',
      });
      done();
    });
  });
});
