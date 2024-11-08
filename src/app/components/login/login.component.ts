import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.loading$ = this.store.select(state => state.auth.loading);
    this.error$ = this.store.select(state => state.auth.error);
  }

}
