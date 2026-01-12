import { TipoMovimientoBancario } from "../../enums/tipo-movimiento-bancario";
import { OrigenMovimientoBancario } from "../../enums/origen-movimiento-bancario";

export interface movimientoBancario {
  id: number;
  fecha: Date
  concepto: string;
  importe: number;
  tipoMovimientoBancario: TipoMovimientoBancario;
  origenMovimientoBancario: OrigenMovimientoBancario;
}
