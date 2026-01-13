export interface tarjetaCredito {
    id: number;
    numeroTarjeta: string;
    fechaCaducidad: string;
    cvc: string;
    nombreCompleto: string;
    cuentaId?: number;
    limite?: number;
    saldo?: number;
}