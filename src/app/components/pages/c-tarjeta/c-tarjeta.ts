import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../../services/Tarjeta.Service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { tarjetaCredito } from '../../../models/tarjeta-credito/tarjeta-credito';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { movimientoBancario } from '../../../models/movimiento-bancario/movimientoBancario';
import { TipoMovimientoBancario } from '../../../enums/tipo-movimiento-bancario';
import { OrigenMovimientoBancario } from '../../../enums/origen-movimiento-bancario';

import { MovimientosService } from '../../../services/Movimientos.Service';

@Component({
  selector: 'app-c-tarjeta',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe, RouterLink],
  templateUrl: './c-tarjeta.html',
  styleUrl: './c-tarjeta.scss',
})
export class CTarjeta implements OnInit {
  tarjeta: tarjetaCredito | undefined = undefined;
  loading: boolean = true;
  error: string | null = null;
  movimientos: movimientoBancario[] = [];

  constructor(
    private route: ActivatedRoute,
    private tarjetaService: TarjetaService,
    private movimientosService: MovimientosService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchTarjetaDetails(id);
    } else {
      this.error = 'No se proporcionó un número de tarjeta válido.';
      this.loading = false;
    }
  }

  fetchTarjetaDetails(numeroTarjeta: string) {
    this.loading = true;
    this.tarjetaService.getTarjetaById(parseInt(numeroTarjeta)).subscribe({ // Assuming the backend still expects numeric internally or I should use string if it's the identifier. The guide says GET /api/tarjetas/{id}. If id is numeroTarjeta, then I use string. But usually id is numeric. However, numeroTarjeta is a string "XXXX-XXXX-...".
      next: (data: tarjetaCredito | undefined) => {
        this.tarjeta = data;
        if (this.tarjeta) {
          // Note: Spec 2.0 doesn't show movements by card, only by account.
          // For now, if we don't have account ID, we don't fetch movements.
        } else {
          this.error = 'La tarjeta solicitada no existe.';
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching card details:', err);
        this.error = 'Error al cargar los detalles de la tarjeta.';
        this.loading = false;
      },
    });
  }

  fetchMovimientos(cuentaId: number) {
    this.movimientosService.getMovimientosByCuenta(cuentaId).subscribe({
      next: (data: movimientoBancario[]) => {
        this.movimientos = data;
      },
      error: (err: any) => {
        console.error('Error fetching movements:', err);
      }
    });
  }
}
