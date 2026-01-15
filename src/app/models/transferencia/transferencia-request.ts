export interface AutorizacionRequest {
    login: string;
    api_token: string;
}

export interface DestinoRequest {
    iban: string;
}

export interface OrigenTransferencia {
    iban: string;
}

export interface PagoRequest {
    importe: number;
    concepto: string;
}

export interface TransferenciaRequest {
    autorizacion: AutorizacionRequest;
    origen: OrigenTransferencia;
    destino: DestinoRequest;
    pago: PagoRequest;
}
