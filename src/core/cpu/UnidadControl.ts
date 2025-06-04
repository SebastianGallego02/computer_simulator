// src/core/cpu/UnidadControl.ts
import { CodigosInstruccion, opcodeToInstruction } from "../enums/CodigosInstruccion";
import { TipoOperacion } from "../enums/TipoOperacion";
import { CPU } from "./CPU";

export class UnidadControl {
  /**
   * Decodifica el valor binario de la instrucción almacenada en el IR
   * @param valor Código de la instrucción (8 bits)
   * @returns { opcode, operando }
   */
  decodificar(valor: number) {
    // Primeros 3 bits: opcode, últimos 5 bits: operando
    const opcodeNum = (valor & 0b11100000) >> 5; // 3 bits más significativos
    const operando = valor & 0b00011111;         // 5 bits menos significativos
    // Mapea número a string
    const opcode = opcodeToInstruction[opcodeNum] || CodigosInstruccion.NOP;
    return { opcode, operando };
  }

  /**
   * Ejecuta la instrucción decodificada sobre la CPU
   * @param instruccion Objeto con opcode y operando
   * @param cpu Instancia de la CPU
   */
  ejecutar(instruccion: { opcode: string; operando: number }, cpu: CPU) {
    const { opcode, operando } = instruccion;
    switch (opcode) {
      case CodigosInstruccion.NOP:
        // No Operation
        break;

      case CodigosInstruccion.LOAD:
        cpu.mar.setDireccion(operando);
        cpu.bus.enviarDireccion(cpu.mar.valor);
        cpu.bus.enviarDato(cpu.memoria.leer(cpu.mar.valor));
        cpu.mbr.setDato(cpu.bus.dato);
        
        const mbrValue = cpu.mbr.valor & 0b00011111;         // se hace asi, para garantizar que pasa por el mbr
        cpu.registros.escribir(0, mbrValue);
        // cpu.registros.escribir(0, cpu.memoria.leer(operando));
        break;

      case CodigosInstruccion.ADD:
        cpu.mar.setDireccion(operando);
        cpu.bus.enviarDireccion(cpu.mar.valor);
        cpu.mbr.setDato(cpu.memoria.leer(cpu.mar.valor));
        {
          const acc = cpu.registros.leer(0);
          const valor = cpu.memoria.leer(operando);
          cpu.registros.escribir(0, cpu.alu.operar(TipoOperacion.ADD, acc, valor));
        }
        break;

      case CodigosInstruccion.STORE:
        cpu.mar.setDireccion(operando);
        cpu.bus.enviarDireccion(cpu.mar.valor);
        cpu.bus.enviarDato(cpu.registros.leer(0));
        cpu.mbr.setDato(cpu.registros.leer(0));
        cpu.memoria.escribir(cpu.mar.valor, cpu.mbr.valor);
        // {
        //   const acc = cpu.registros.leer(0);
        //   cpu.memoria.escribir(operando, acc);
        // }
        break;

      case CodigosInstruccion.HALT:
        cpu.halted = true;
        break;

 
      default:

        break;
    }
  }
}
