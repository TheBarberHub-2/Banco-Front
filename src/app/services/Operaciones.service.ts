import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tarjetaCredito } from '../models/tarjeta-credito/tarjeta-credito';

export interface AutorizacionRequest {
    login: string;
    api_token: string;
}

export interface PagoRequest {
    importe: number;
    concepto: string;
}

export interface TransferenciaRequest {
    autorizacion: AutorizacionRequest;
    origen: { iban: string };
    destino: { iban: string };
    pago: PagoRequest;
}

export interface PagoTarjetaRequest {
    autorizacion: AutorizacionRequest;
    origen: tarjetaCredito;
    destino: { iban: string };
    pago: PagoRequest;
}

@Injectable({
    providedIn: 'root',
})
export class OperacionesService {
    private apiUrl = 'http://greatbank-back.producciondaw.cip.fpmislata.com/api';

    constructor(private http: HttpClient) { }

    transferencia(request: TransferenciaRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/transferencia`, request);
    }

    pagoTarjeta(request: PagoTarjetaRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/pago_tarjeta`, request);
    }
}
