import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { cold, hot } from 'jasmine-marbles';
import { provideMockStore } from '@ngrx/store/testing';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'logout']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        provideMockStore({}),
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  describe('login$', () => {
    it('should return a loginSuccess action with user data on successful login', () => {
      const user = { id: 1, name: 'Test User' };
      const credentials = { username: 'test', password: 'password' };
      const action = AuthActions.login({ credentials });
      const outcome = AuthActions.loginSuccess({ user });

      actions$ = hot('-a-', { a: action });
      const response = cold('-b|', { b: user });
      authService.login.and.returnValue(response);

      const expected = cold('--c', { c: outcome });
      expect(effects.login$).toBeObservable(expected);
    });

    it('should return a loginFailure action on failed login', () => {
      const credentials = { username: 'test', password: 'password' };
      const action = AuthActions.login({ credentials });
      const error = 'Invalid credentials';
      const outcome = AuthActions.loginFailure({ error });

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, error);
      authService.login.and.returnValue(response);

      const expected = cold('--c', { c: outcome });
      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('logout$', () => {
    it('should dispatch logoutSuccess action on successful logout', () => {
      const action = AuthActions.logout();
      const outcome = AuthActions.logoutSuccess();

      actions$ = hot('-a-', { a: action });
      const expected = cold('-b', { b: outcome });

      expect(effects.logout$).toBeObservable(expected);
    });
  });
});
