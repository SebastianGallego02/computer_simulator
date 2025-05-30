import { CodigosInstruccion } from "../enums/CodigosInstruccion";
import { ModoDireccionamiento } from "../enums/ModoDireccionamiento";

export interface InstruccionDecodificada {
  codigo: CodigosInstruccion;
  modo: ModoDireccionamiento;
  operandos: number[];
}

export interface EstadoCPU {
  pc: number;
  registros: number[];
  mar: number;
  mbr: number;
  ir: number;
  // Otros estados relevantes
}
