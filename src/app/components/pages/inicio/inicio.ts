import { Component, OnInit } from '@angular/core';
import { CPanel } from '../../ui/c-panel/c-panel';
import { CuentasService } from '../../../services/Cuentas.Service';
import { TarjetaService } from '../../../services/Tarjeta.Service';
import { cuentaBancaria } from '../../../models/cuenta-bancaria/cuentaBancaria';
import { tarjetaCredito } from '../../../models/tarjeta-credito/tarjeta-credito';
import { CommonModule } from '@angular/common';

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
    private tarjetaService: TarjetaService
  ) { }

  ngOnInit() {
    this.cuentasService.getCuentas().subscribe((data) => {
      this.cuentas = data;
    });

    this.tarjetaService.getTarjetas().subscribe((data) => {
      this.tarjetas = data;
    });
  }
}
