import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { cuentaBancaria } from '../models/cuenta-bancaria/cuentaBancaria';

@Injectable({
    providedIn: 'root'
})
export class CuentasService {
    private mockCuentas: cuentaBancaria[] = [
        { id: 1, iban: 'ES21 1234 5678 9012 3456 7890', saldo: 1540.50 },
        { id: 2, iban: 'ES21 9876 5432 1098 7654 3210', saldo: 230.00 },
        { id: 3, iban: 'ES21 5555 4444 3333 2222 1111', saldo: 12500.75 }
    ];

    constructor() { }

    getCuentas(): Observable<cuentaBancaria[]> {
        return of(this.mockCuentas);
    }
}
