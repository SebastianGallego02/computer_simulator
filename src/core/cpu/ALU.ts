// src/core/cpu/ALU.ts
import { TipoOperacion } from "../enums/TipoOperacion";

export class ALU {
  resultado: number = 0;

  operar(operacion: TipoOperacion, OpeA: number, OpeB: number): number {
    const a = OpeA & 0b00011111;         // 5 bits menos significativos
    const b = OpeB & 0b00011111;         // 5 bits menos significativos

    switch (operacion) {
      case "ADD":
        this.resultado = (a + b) & 0xFF;
        break;
      case "SUB":
        this.resultado = (a - b) & 0xFF;
        break;
      case "AND":
        this.resultado = a & b;
        break;
      case "OR":
        this.resultado = a | b;
        break;
      case "XOR":
        this.resultado = a ^ b;
        break;
      case "NOT":
        this.resultado = (~a) & 0xFF;
        break;
      case "INC":
        this.resultado = (a + 1) & 0xFF;
        break;
      case "DEC":
        this.resultado = (a - 1) & 0xFF;
        break;
      
      default:
        this.resultado = 0;
    }
    return this.resultado;
  }
}
