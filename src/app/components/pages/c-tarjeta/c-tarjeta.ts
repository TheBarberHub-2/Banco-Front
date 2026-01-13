import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../../services/Tarjeta.Service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { tarjetaCredito } from '../../../models/tarjeta-credito/tarjeta-credito';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { movimientoBancario } from '../../../models/movimiento-bancario/movimientoBancario';
import { TipoMovimientoBancario } from '../../../enums/tipo-movimiento-bancario';
import { OrigenMovimientoBancario } from '../../../enums/origen-movimiento-bancario';

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
    private tarjetaService: TarjetaService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const tarjetaId = parseInt(id);
      this.fetchTarjetaDetails(tarjetaId);
    } else {
      this.error = 'No se proporcionó un ID de tarjeta válido.';
      this.loading = false;
    }
  }

  fetchTarjetaDetails(id: number) {
    this.loading = true;
    this.tarjetaService.getTarjetaById(id).subscribe({
      next: (data) => {
        this.tarjeta = data;
        if (this.tarjeta) {
          this.fetchMovimientos();
        } else {
          this.error = 'La tarjeta solicitada no existe.';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching card details:', err);
        this.error = 'Error al cargar los detalles de la tarjeta.';
        this.loading = false;
      },
    });
  }

  fetchMovimientos() {
    this.movimientos = [
      { id: 1, fecha: new Date('2026-01-08'), concepto: 'Compra Amazon', importe: -89.99, tipoMovimientoBancario: TipoMovimientoBancario.Egreso, origenMovimientoBancario: OrigenMovimientoBancario.TarjetaBancaria },
      { id: 2, fecha: new Date('2026-01-09'), concepto: 'Gasolinera Repsol', importe: -60.00, tipoMovimientoBancario: TipoMovimientoBancario.Egreso, origenMovimientoBancario: OrigenMovimientoBancario.TarjetaBancaria },
      { id: 3, fecha: new Date('2026-01-10'), concepto: 'Restaurante El Pescador', importe: -120.50, tipoMovimientoBancario: TipoMovimientoBancario.Egreso, origenMovimientoBancario: OrigenMovimientoBancario.TarjetaBancaria },
      { id: 4, fecha: new Date('2026-01-11'), concepto: 'Devolución suscripción', importe: 12.99, tipoMovimientoBancario: TipoMovimientoBancario.Ingreso, origenMovimientoBancario: OrigenMovimientoBancario.TarjetaBancaria }
    ];
  }
}
