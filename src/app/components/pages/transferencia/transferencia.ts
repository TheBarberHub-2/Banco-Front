import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranferenciaService } from '../../../services/Tranferencia.service';
import { CuentasService } from '../../../services/Cuentas.Service';
import { AuthService } from '../../../services/Auth.Service';
import { cuentaBancaria } from '../../../models/cuenta-bancaria/cuentaBancaria';
import { TransferenciaRequest } from '../../../models/transferencia/transferencia-request';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './transferencia.html',
  styleUrl: './transferencia.scss',
})
export class Transferencia implements OnInit {
  iban: string = '';
  transferForm: FormGroup;
  cuentas: cuentaBancaria[] = [];
  loading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  // Pattern from backend: ^ES\d{2}(?:\s?\d{4}){5}$
  private ibanPattern = /^ES\d{2}(?:\s?\d{4}){5}$/;

  constructor(
    private fb: FormBuilder,
    private transferenciaService: TranferenciaService,
    private cuentasService: CuentasService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.transferForm = this.fb.group({
      origenIban: [this.iban, [Validators.required, Validators.pattern(this.ibanPattern)]],
      destinoIban: ['', [Validators.required, Validators.pattern(this.ibanPattern)]],
      importe: [null, [Validators.required, Validators.min(0.01)]],
      concepto: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.loadCuentas();
    this.route.queryParams.subscribe((params) => {
      this.iban = params['iban'];
    });
  }

  loadCuentas(): void {
    const login = this.authService.getLogin();
    if (!login) {
      this.errorMessage = 'No se ha encontrado sesión de usuario.';
      return;
    }

    const ibanParam = this.route.snapshot.queryParams['numeroCuenta'];
    if (ibanParam) {
      this.transferForm.get('origenIban')?.setValue(ibanParam);
    }

    this.cuentasService.getClienteProfile(login).subscribe({
      next: (profile: any) => {
        const cliente = Array.isArray(profile) ? profile[0] : profile;
        if (cliente && cliente.id) {
          this.cuentasService.getCuentasByCliente(cliente.id).subscribe({
            next: (data: any) => {
              this.cuentas = Array.isArray(data) ? data : (data as any).data || [];
              if (!ibanParam && this.cuentas.length === 1) {
                this.transferForm.patchValue({ origenIban: this.cuentas[0].iban });
              }
            },
            error: (err) => {
              console.error('Error loading accounts', err);
              this.errorMessage = 'Error al cargar tus cuentas.';
            },
          });
        }
      },
      error: (err) => {
        console.error('Error loading profile', err);
        this.errorMessage = 'Error al obtener el perfil del cliente.';
      },
    });
  }

  onSubmit(): void {
    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const formValue = this.transferForm.getRawValue();
    const login = this.authService.getLogin() || '';
    const apiToken = this.authService.getApiToken() || '';

    const request: TransferenciaRequest = {
      autorizacion: {
        login: login,
        api_token: apiToken,
      },
      origen: {
        iban: formValue.origenIban,
      },
      destino: {
        iban: formValue.destinoIban,
      },
      pago: {
        importe: formValue.importe,
        concepto: formValue.concepto,
      },
    };

    this.transferenciaService.procesarTransferencia(request).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Transferencia realizada con éxito.';
        setTimeout(() => this.router.navigate(['/inicio']), 2000);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error processing transfer', err);
        // Extract diagnostic message from backend if available
        this.errorMessage =
          err.error?.error ||
          err.error?.message ||
          'Hubo un error al procesar la transferencia. Por favor, inténtalo de nuevo.';
      },
    });
  }
}
