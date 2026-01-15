import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferenciaRequest } from '../models/transferencia/transferencia-request';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TranferenciaService {
    private apiUrl = '/api/transferencia';

    constructor(private http: HttpClient) { }

    procesarTransferencia(request: TransferenciaRequest): Observable<void> {
        return this.http.post<void>(this.apiUrl, request);
    }
}
