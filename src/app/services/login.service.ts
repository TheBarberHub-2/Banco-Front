import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogIn } from '../models/login';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) { }

  private apiUrl = '/auth';

  logIn(credentials: LogIn): Observable<void> {
    return this.http.post<{ token: string }>(this.apiUrl + '/login', credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('login', credentials.login);
      }),
      map(() => { })
    );
  }
}
