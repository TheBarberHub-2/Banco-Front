import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tarjetaCredito } from '../models/tarjeta-credito/tarjeta-credito';

@Injectable({
    providedIn: 'root'
})
export class TarjetaService {
    private apiUrl = '/api/tarjetas';

    constructor(private http: HttpClient) { }

    getTarjetasByCuentaId(cuentaId: number): Observable<tarjetaCredito[]> {
        return this.http.get<tarjetaCredito[]>(`${this.apiUrl}/cuenta/${cuentaId}`);
    }

    getTarjetaById(id: number): Observable<tarjetaCredito> {
        return this.http.get<tarjetaCredito>(`${this.apiUrl}/${id}`);
    }
}
