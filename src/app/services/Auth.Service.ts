import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/auth/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any) {
    return this.http.post<any>(this.apiUrl, credentials); //Aqui devolveria el token que me da el backend a traves de la api y el metodo
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLogged() {
    return !!localStorage.getItem('token');
  }

  getLogin(): string | null {
    return localStorage.getItem('login');
  }

  setApiToken(apiToken: string) {
    localStorage.setItem('apiToken', apiToken);
  }

  getApiToken(): string | null {
    return localStorage.getItem('apiToken');
  }

  logout() {
    this.http.delete('/auth/logout').subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
        // Still clear local data and redirect even if server call fails
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        this.router.navigate(['/login']);
      },
    });
  }
}
