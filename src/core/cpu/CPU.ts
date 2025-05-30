// src/core/cpu/CPU.ts
import { ALU } from "./ALU";
import { UnidadControl } from "./UnidadControl";
import { ContadorPrograma } from "./ContadorPrograma";
import { IR } from "./IR";
import { MAR } from "./MAR";
import { MBR } from "./MBR";
import { BancoRegistros } from "./BancoRegistros";
import { BusSistema } from "../bus/BusSistema";
import { MemoriaPrincipal } from "../memoria/MemoriaPrincipal";
import { DispositivosIO } from "../io/DispositivosIO";
import { ManejadorInterrupciones } from "../interruptions/ManejadorInterrupciones";

export class CPU {
  alu: ALU;
  uc: UnidadControl;
  pc: ContadorPrograma;
  ir: IR;
  mar: MAR;
  mbr: MBR;
  registros: BancoRegistros;
  bus: BusSistema;
  memoria: MemoriaPrincipal;
  io: DispositivosIO;
  interrupciones: ManejadorInterrupciones;
  halted: boolean = false;

  constructor(memoria: MemoriaPrincipal, io: DispositivosIO, bus: BusSistema, interrupciones: ManejadorInterrupciones) {
    this.memoria = memoria;
    this.io = io;
    this.bus = bus;
    this.interrupciones = interrupciones;

    this.alu = new ALU();
    this.uc = new UnidadControl();
    this.pc = new ContadorPrograma();
    this.ir = new IR();
    this.mar = new MAR();
    this.mbr = new MBR();
    this.registros = new BancoRegistros();
    this.halted = false;
  }

  cicloFetchDecodeExecute() {
    if (this.halted) return; 

    // 1. Fetch
    this.mar.setDireccion(this.pc.valor);
    this.bus.enviarDireccion(this.mar.valor);
    this.mbr.setDato(this.memoria.leer(this.mar.valor));
    this.ir.setInstruccion(this.mbr.valor);

    // 2. Decode + Execute
    const instruccion = this.uc.decodificar(this.ir.valor);
    this.uc.ejecutar(instruccion, this);

    // 3. Avanzar PC (si corresponde)
    this.pc.incrementar();
  }

  reset() {
    this.pc.valor = 0;
    this.ir.valor = 0;
    this.halted = false;
  }
}
