import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:9999/login';

  constructor(private http: HttpClient, private store: Store) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(this.loginUrl, { username, password }).pipe(
      tap(response => {
        this.store.dispatch(AuthActions.loginSuccess({ token: response.token }));
      }),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
    }
    this.store.dispatch(AuthActions.loginFailure({ error: errorMessage }));
    return throwError(errorMessage);
  }
}