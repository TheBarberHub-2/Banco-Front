import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../../services/Tarjeta.Service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { tarjetaCredito } from '../../../models/tarjeta-credito/tarjeta-credito';
import { cuentaBancaria } from '../../../models/cuenta-bancaria/cuentaBancaria';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { movimientoBancario } from '../../../models/movimiento-bancario/movimientoBancario';
import { TipoMovimientoBancario } from '../../../enums/tipo-movimiento-bancario';
import { OrigenMovimientoBancario } from '../../../enums/origen-movimiento-bancario';
import { CuentasService } from '../../../services/Cuentas.Service';
import { AuthService } from '../../../services/Auth.Service';

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
    private cuentasService: CuentasService,
    private authService: AuthService,
    private movimientosService: MovimientosService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchTarjetaDetails(id);
    } else {
      this.error = 'No se proporcionó un ID de tarjeta válido.';
      this.loading = false;
    }
  }

  fetchTarjetaDetails(tarjetaId: string) {
    this.loading = true;
    console.log('Fetching card details for tarjetaId:', tarjetaId);
    const login = this.authService.getLogin();
    if (!login) {
      this.error = 'Usuario no autenticado.';
      this.loading = false;
      return;
    }

    // Get client profile to get clienteId
    this.cuentasService.getClienteProfile(login).subscribe({
      next: (response: any) => {
        console.log('Client profile response:', response);
        const cliente = Array.isArray(response) ? response[0] : response;
        if (cliente && cliente.id) {
          // Get all accounts for this client
          this.cuentasService.getCuentasByCliente(cliente.id).subscribe({
            next: (cuentas: any) => {
              console.log('Accounts response:', cuentas);
              const processedCuentas = Array.isArray(cuentas) ? cuentas : (cuentas as any).data || [];
              console.log('Processed accounts:', processedCuentas);
              
              if (processedCuentas.length === 0) {
                this.error = 'No se encontraron cuentas para este cliente.';
                this.loading = false;
                return;
              }
              
              // Fetch cards for each account and find the specific card
              let accountsChecked = 0;
              processedCuentas.forEach((cuenta: cuentaBancaria) => {
                if (cuenta.id) {
                  console.log('Fetching cards for account:', cuenta.id);
                  this.tarjetaService.getTarjetasByCuentaId(cuenta.id).subscribe({
                    next: (tarjetas: tarjetaCredito[]) => {
                      console.log(`Cards for account ${cuenta.id}:`, tarjetas);
                      accountsChecked++;
                      
                      if (!this.tarjeta) {
                        const processedTarjetas = Array.isArray(tarjetas) ? tarjetas : (tarjetas as any).data || [];
                        const foundTarjeta = processedTarjetas.find((t: tarjetaCredito) => t.numeroTarjeta === tarjetaId);
                        console.log(`Searching for tarjeta with numeroTarjeta: ${tarjetaId}, found:`, foundTarjeta);
                        
                        if (foundTarjeta) {
                          console.log('Card found:', foundTarjeta);
                          this.tarjeta = foundTarjeta;
                          // Fetch movements for this account
                          if (cuenta.id) {
                            this.fetchMovimientos(cuenta.id);
                          }
                        }
                      }
                      
                      // When all accounts have been checked, finish loading
                      if (accountsChecked === processedCuentas.length) {
                        if (!this.tarjeta) {
                          this.error = 'La tarjeta solicitada no existe.';
                        }
                        this.loading = false;
                      }
                    },
                    error: (err: any) => {
                      console.error('Error fetching cards:', err);
                      accountsChecked++;
                      if (accountsChecked === processedCuentas.length) {
                        if (!this.tarjeta) {
                          this.error = 'La tarjeta solicitada no existe.';
                        }
                        this.loading = false;
                      }
                    }
                  });
                } else {
                  accountsChecked++;
                }
              });
            },
            error: (err: any) => {
              console.error('Error fetching accounts:', err);
              this.error = 'Error al cargar las cuentas.';
              this.loading = false;
            }
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
      }
    });
  }

  fetchMovimientos(cuentaId: number) {
    console.log('Fetching movements for tarjeta in cuenta:', cuentaId);
    this.movimientosService.getMovimientosByCuenta(cuentaId).subscribe({
      next: (data: any) => {
        console.log('Movements response:', data);
        const allMovimientos = Array.isArray(data) ? data : (data as any).data || [];
        // Filter movements to show only those from tarjeta (credit card transactions)
        this.movimientos = allMovimientos.filter((m: movimientoBancario) => 
          m.origen === 'TARJETA_BANCARIA' || m.origen === OrigenMovimientoBancario.TARJETA_BANCARIA
        );
        console.log('Filtered movimientos for tarjeta:', this.movimientos);
      },
      error: (err: any) => {
        console.error('Error fetching movements:', err);
      }
    });
  }
}
