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
    private tarjetaService: TarjetaService
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
      next: (data) => {
        this.cuenta = data;
        if (this.cuenta) {
          this.fetchMovimientos();
        } else {
          this.error = 'La cuenta solicitada no existe.';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching account details:', err);
        this.error = 'Error al cargar los detalles de la cuenta.';
        this.loading = false;
      },
    });
  }

  fetchMovimientos() {
    // Para simplificar y como es mock, usaremos datos estáticos aquí
    this.movimientos = [
      { id: 1, fecha: new Date('2026-01-10'), concepto: 'Nómina Enero 2026', importe: 2500.00, tipoMovimientoBancario: TipoMovimientoBancario.Ingreso, origenMovimientoBancario: OrigenMovimientoBancario.Transferencia },
      { id: 2, fecha: new Date('2026-01-11'), concepto: 'Pago Mercadona', importe: -45.20, tipoMovimientoBancario: TipoMovimientoBancario.Egreso, origenMovimientoBancario: OrigenMovimientoBancario.TarjetaBancaria },
      { id: 3, fecha: new Date('2026-01-12'), concepto: 'Transferencia recibida', importe: 150.00, tipoMovimientoBancario: TipoMovimientoBancario.Ingreso, origenMovimientoBancario: OrigenMovimientoBancario.Transferencia },
      { id: 4, fecha: new Date('2026-01-12'), concepto: 'Pago Netflix', importe: -17.99, tipoMovimientoBancario: TipoMovimientoBancario.Egreso, origenMovimientoBancario: OrigenMovimientoBancario.TarjetaBancaria }
    ];
  }
}
