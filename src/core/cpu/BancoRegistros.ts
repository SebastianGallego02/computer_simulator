
export class BancoRegistros {
  registros: number[];

  constructor(numRegistros: number = 8) {
    this.registros = Array(numRegistros).fill(0);
  }

  leer(idx: number): number { return this.registros[idx]; }
  escribir(idx: number, valor: number) { this.registros[idx] = valor; }
}
