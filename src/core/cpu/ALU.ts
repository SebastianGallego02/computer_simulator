// src/core/cpu/ALU.ts
import { TipoOperacion } from "../enums/TipoOperacion";

export class ALU {
  resultado: number = 0;

  operar(operacion: TipoOperacion, a: number, b: number): number {
    switch (operacion) {
      case TipoOperacion.ADD:
        this.resultado = a + b; break;
      case TipoOperacion.SUB:
        this.resultado = a - b; break;
      case TipoOperacion.AND:
        this.resultado = a & b; break;
      case TipoOperacion.OR:
        this.resultado = a | b; break;
      // Agrega más operaciones según tu enum
      default:
        this.resultado = 0;
    }
    return this.resultado;
  }
}
