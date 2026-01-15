import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = '/api/clientes';

  constructor(private http: HttpClient) {}

  getApiTokenByLogin(login: string) {
    return this.http.get<{ login: string; apiToken: string }>(`${this.apiUrl}/token`, {
      params: { login },
    });
  }
}
