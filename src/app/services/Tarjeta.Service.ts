import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tarjetaCredito } from '../models/tarjeta-credito/tarjeta-credito';

@Injectable({
    providedIn: 'root'
})
export class TarjetaService {
    private mockTarjetas: tarjetaCredito[] = [
        { id: 1, numeroTarjeta: '**** **** **** 1234', fechaExpiracion: new Date('2028-12-31'), nombreTitular: 'Pau Perez' },
        { id: 2, numeroTarjeta: '**** **** **** 5678', fechaExpiracion: new Date('2026-06-30'), nombreTitular: 'Pau Perez' }
    ];

    constructor() { }

    getTarjetas(): Observable<tarjetaCredito[]> {
        return of(this.mockTarjetas);
    }
}
