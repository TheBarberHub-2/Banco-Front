import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { cuentaBancaria } from '../models/cuenta-bancaria/cuentaBancaria';

@Injectable({
    providedIn: 'root'
})
export class CuentasService {
    private mockCuentas: cuentaBancaria[] = [
        { id: 1, iban: 'ES21 1234 5678 9012 3456 7890', saldo: 1540.50, nombreTitular: 'Pau Pérez' },
        { id: 2, iban: 'ES21 9876 5432 1098 7654 3210', saldo: 230.00, nombreTitular: 'Ana García' },
        { id: 3, iban: 'ES21 5555 4444 3333 2222 1111', saldo: 12500.75, nombreTitular: 'Empresa S.A.' }
    ];

    constructor() { }

    getCuentas(): Observable<cuentaBancaria[]> {
        return of(this.mockCuentas);
    }

    getCuentaById(id: number): Observable<cuentaBancaria | undefined> {
        const cuenta = this.mockCuentas.find(c => c.id === id);
        return of(cuenta);
    }
}
