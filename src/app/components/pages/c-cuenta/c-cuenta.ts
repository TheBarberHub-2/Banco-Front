import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { cuentaBancaria } from '../../../models/cuenta-bancaria/cuentaBancaria';
import { tarjetaCredito } from '../../../models/tarjeta-credito/tarjeta-credito';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CuentasService } from '../../../services/Cuentas.Service';
import { TarjetaService } from '../../../services/Tarjeta.Service';
import { movimientoBancario } from '../../../models/movimiento-bancario/movimientoBancario';
import { TipoMovimientoBancario } from '../../../enums/tipo-movimiento-bancario';
import { OrigenMovimientoBancario } from '../../../enums/origen-movimiento-bancario';

import { MovimientosService } from '../../../services/Movimientos.Service';

@Component({
  selector: 'app-c-cuenta',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterLink],
  templateUrl: './c-cuenta.html',
  styleUrl: './c-cuenta.scss',
})
export class CCuenta implements OnInit {
  cuenta: cuentaBancaria | undefined = undefined;
  tarjetas: tarjetaCredito[] = [];
  loading: boolean = true;
  error: string | null = null;
  movimientos: movimientoBancario[] = [];

  constructor(
    private route: ActivatedRoute,
    private cuentasService: CuentasService,
    private tarjetaService: TarjetaService,
    private movimientosService: MovimientosService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const cuentaId = parseInt(id);
      this.fetchCuentaDetails(cuentaId);
    } else {
      this.error = 'No se proporcionó un ID de cuenta válido.';
      this.loading = false;
    }
  }

  fetchCuentaDetails(id: number) {
    this.loading = true;
    this.cuentasService.getCuentaById(id).subscribe({
      next: (data: cuentaBancaria | undefined) => {
        this.cuenta = data;
        if (this.cuenta && this.cuenta.id) {
          this.fetchMovimientos(this.cuenta.id);
        } else if (this.cuenta && !this.cuenta.id) {
          // If no ID but we have the account, maybe we can't fetch movements yet?
          // Or the backend should be updated as noted in the prompt.
          console.warn('Account found but no ID available for movements lookup.');
        } else {
          this.error = 'La cuenta solicitada no existe.';
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching account details:', err);
        this.error = 'Error al cargar los detalles de la cuenta.';
        this.loading = false;
      },
    });
  }

  fetchMovimientos(id: number) {
    this.movimientosService.getMovimientosByCuenta(id).subscribe({
      next: (data: movimientoBancario[]) => {
        this.movimientos = data;
      },
      error: (err: any) => {
        console.error('Error fetching movements:', err);
      }
    });
  }
}
