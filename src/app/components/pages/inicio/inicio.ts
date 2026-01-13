import { Component, OnInit } from '@angular/core';
import { CPanel } from '../../ui/c-panel/c-panel';
import { CuentasService } from '../../../services/Cuentas.Service';
import { TarjetaService } from '../../../services/Tarjeta.Service';
import { cuentaBancaria } from '../../../models/cuenta-bancaria/cuentaBancaria';
import { tarjetaCredito } from '../../../models/tarjeta-credito/tarjeta-credito';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/Auth.Service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CPanel, CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio implements OnInit {
  cuentas: cuentaBancaria[] = [];
  tarjetas: tarjetaCredito[] = [];

  constructor(
    private cuentasService: CuentasService,
    private tarjetaService: TarjetaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const login = this.authService.getLogin();
    if (login) {
      console.log('Fetching profile for login:', login);
      this.cuentasService.getClienteProfile(login).subscribe({
        next: (response: any) => {
          console.log('Profile response:', response);
          const cliente = Array.isArray(response) ? response[0] : response;
          if (cliente && cliente.id) {
            console.log('Found cliente ID:', cliente.id);
            this.fetchData(cliente.id);
          } else {
            console.warn('No cliente ID found in response');
          }
        },
        error: (err) => console.error('Error fetching profile:', err)
      });
    }
  }

  fetchData(clienteId: number) {
    console.log('Fetching accounts for clienteId:', clienteId);
    this.cuentasService.getCuentasByCliente(clienteId).subscribe({
      next: (cuentas) => {
        console.log('Accounts response:', cuentas);
        this.cuentas = Array.isArray(cuentas) ? cuentas : (cuentas as any).data || [];
        console.log('Processed cuentas:', this.cuentas);

        // Fetch cards for each account to populate the tarjetas list
        this.tarjetas = [];
        this.cuentas.forEach(cuenta => {
          if (cuenta.id) {
            console.log('Fetching cards for account ID:', cuenta.id);
            this.tarjetaService.getTarjetasByCuentaId(cuenta.id).subscribe({
              next: (tarjetas) => {
                console.log(`Cards for account ${cuenta.id}:`, tarjetas);
                const processedTarjetas = Array.isArray(tarjetas) ? tarjetas : (tarjetas as any).data || [];
                this.tarjetas = [...this.tarjetas, ...processedTarjetas];
              },
              error: (err) => console.error(`Error fetching cards for account ${cuenta.id}:`, err)
            });
          }
        });
      },
      error: (err) => console.error('Error fetching accounts:', err)
    });
  }
}
