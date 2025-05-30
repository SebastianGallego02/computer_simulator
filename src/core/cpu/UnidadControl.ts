// src/core/cpu/UnidadControl.ts
import { CodigosInstruccion } from "../enums/CodigosInstruccion";
import { CPU } from "./CPU";

export class UnidadControl {
  decodificar(codigo: number) {
    // Devuelve una estructura con tipo de instrucción y operandos
    // Aquí podrías mapear el número a un enum o tipo
    return codigo;
  }

  ejecutar(instruccion: any, cpu: CPU) {
    // Lógica para ejecutar la instrucción según el código
    switch (instruccion) {
      case CodigosInstruccion.NOP:
        // No hacer nada
        break;
      case CodigosInstruccion.LOAD:
        // Ejemplo: cargar registro con valor de memoria
        break;
      case CodigosInstruccion.ADD:
        // Ejecutar suma usando ALU
        break;
      // etc
    }
  }
}
