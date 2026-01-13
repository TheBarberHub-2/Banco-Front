export interface movimientoBancario {
  id: number;
  cuentaId: number;
  importe: number;
  concepto: string;
  fecha: string;
  tipo: 'DEBE' | 'HABER';
}
