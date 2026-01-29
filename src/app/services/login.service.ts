import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogIn } from '../models/login';
import { map, Observable, switchMap, tap } from 'rxjs';
import { ClienteService } from './Cliente.Service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private clienteService: ClienteService) { }

  private apiUrl = 'http://greatbank-back.producciondaw.cip.fpmislata.com/auth';

  logIn(credentials: LogIn): Observable<void> {
    return this.http.post<{ token: string }>(this.apiUrl + '/login', credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('login', credentials.login);
      }),
      switchMap(() => this.clienteService.getApiTokenByLogin(credentials.login)),
      tap((cliente) => {
        localStorage.setItem('apiToken', cliente.apiToken);
      }),
      map(() => { })
    );
  }
}
