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
import { AuthService } from '../../../services/Auth.Service';

import { MovimientosService } from '../../../services/Movimientos.Service';
import { CPanel } from '../../ui/c-panel/c-panel';

@Component({
  selector: 'app-c-cuenta',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterLink, CPanel],
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
    private movimientosService: MovimientosService,
    private authService: AuthService
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

  fetchCuentaDetails(cuentaId: number) {
    this.loading = true;
    const login = this.authService.getLogin();
    if (!login) {
      this.error = 'Usuario no autenticado.';
      this.loading = false;
      return;
    }

    // Get client profile to get clienteId
    this.cuentasService.getClienteProfile(login).subscribe({
      next: (response: any) => {
        const cliente = Array.isArray(response) ? response[0] : response;
        if (cliente && cliente.id) {
          // Get all accounts for this client
          this.cuentasService.getCuentasByCliente(cliente.id).subscribe({
            next: (cuentas: cuentaBancaria[]) => {
              // Find the specific account by ID
              const processedCuentas = Array.isArray(cuentas)
                ? cuentas
                : (cuentas as any).data || [];
              this.cuenta = processedCuentas.find((c: cuentaBancaria) => c.id === cuentaId);

              if (this.cuenta && this.cuenta.id) {
                this.fetchMovimientos(this.cuenta.id);
                this.fetchTarjetas(this.cuenta.id);
              } else {
                this.error = 'La cuenta solicitada no existe.';
              }
              this.loading = false;
            },
            error: (err: any) => {
              console.error('Error fetching accounts:', err);
              this.error = 'Error al cargar las cuentas.';
              this.loading = false;
            },
          });
        } else {
          this.error = 'No se pudo obtener la información del cliente.';
          this.loading = false;
        }
      },
      error: (err: any) => {
        console.error('Error fetching client profile:', err);
        this.error = 'Error al cargar el perfil del cliente.';
        this.loading = false;
      },
    });
  }

  fetchMovimientos(id: number) {
    console.log('Fetching movements for cuenta:', id);
    this.movimientosService.getMovimientosByCuenta(id).subscribe({
      next: (data: any) => {
        console.log('Movements response:', data);
        this.movimientos = Array.isArray(data) ? data : (data as any).data || [];
        console.log('Processed movimientos:', this.movimientos);
      },
      error: (err: any) => {
        console.error('Error fetching movements:', err);
      },
    });
  }

  fetchTarjetas(cuentaId: number) {
    console.log('Fetching cards for account:', cuentaId);
    this.tarjetaService.getTarjetasByCuentaId(cuentaId).subscribe({
      next: (data: any) => {
        console.log('Cards response:', data);
        this.tarjetas = Array.isArray(data) ? data : (data as any).data || [];
        console.log('Processed tarjetas:', this.tarjetas);
      },
      error: (err: any) => {
        console.error('Error fetching cards:', err);
      },
    });
  }
}
