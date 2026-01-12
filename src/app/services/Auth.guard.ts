import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './Auth.Service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(
    private auth: AuthService,
    private router: Router,
    private loginService: LoginService
  ) { }

  canActivate(): Observable<boolean> | boolean {
    if (!this.auth.isLogged()) {
      alert('Sesion no iniciada');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
