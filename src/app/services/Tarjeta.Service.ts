import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tarjetaCredito } from '../models/tarjeta-credito/tarjeta-credito';

@Injectable({
    providedIn: 'root'
})
export class TarjetaService {
    private mockTarjetas: tarjetaCredito[] = [
        { id: 1, numeroTarjeta: '**** **** **** 1234', fechaExpiracion: new Date('2028-12-31'), nombreTitular: 'Pau Pérez' },
        { id: 2, numeroTarjeta: '**** **** **** 5678', fechaExpiracion: new Date('2026-06-30'), nombreTitular: 'Pau Pérez' }
    ];

    constructor() { }

    getTarjetas(): Observable<tarjetaCredito[]> {
        return of(this.mockTarjetas);
    }

    getTarjetaById(id: number): Observable<tarjetaCredito | undefined> {
        const tarjeta = this.mockTarjetas.find(t => t.id === id);
        return of(tarjeta);
    }

    // Temporal para compatibilidad si se usa
    getTarjetasByCuentaId(cuentaId: number): Observable<{ data: tarjetaCredito[] }> {
        return of({ data: this.mockTarjetas });
    }
}
