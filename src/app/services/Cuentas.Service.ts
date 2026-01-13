import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cuentaBancaria } from '../models/cuenta-bancaria/cuentaBancaria';
import { Cliente } from '../models/cliente/cliente';

@Injectable({
    providedIn: 'root'
})
export class CuentasService {
    private apiUrl = '/api/cuentas';
    private clienteUrl = '/api/clientes';

    constructor(private http: HttpClient) { }

    getClienteProfile(login: string): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.clienteUrl}?login=${login}`);
    }

    getCuentasByCliente(clienteId: number): Observable<cuentaBancaria[]> {
        return this.http.get<cuentaBancaria[]>(`${this.apiUrl}/cliente/${clienteId}`);
    }

    getCuentaById(id: number): Observable<cuentaBancaria> {
        return this.http.get<cuentaBancaria>(`${this.apiUrl}/${id}`);
    }
}
