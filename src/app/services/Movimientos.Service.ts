import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { movimientoBancario } from '../models/movimiento-bancario/movimientoBancario';

@Injectable({
  providedIn: 'root',
})
export class MovimientosService {
  private apiUrl = '/api/movimientos';

  constructor(private http: HttpClient) {}

  getMovimientosByCuenta(cuentaId: number): Observable<movimientoBancario[]> {
    return this.http.get<movimientoBancario[]>(`${this.apiUrl}/cuenta/${cuentaId}`);
  }

  getMovimientosByTarjeta(tarjetaId: number): Observable<movimientoBancario[]> {
    return this.http.get<movimientoBancario[]>(`${this.apiUrl}/tarjeta/${tarjetaId}`);
  }

  getMovimientoById(id: number): Observable<movimientoBancario> {
    return this.http.get<movimientoBancario>(`${this.apiUrl}/${id}`);
  }
}
