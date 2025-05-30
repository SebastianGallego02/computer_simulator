export class MemoriaPrincipal {
  memoria: number[];

  constructor(tamanio: number = 256) {
    this.memoria = Array(tamanio).fill(0);
  }

  leer(dir: number): number {
    return this.memoria[dir] ?? 0;
  }
  escribir(dir: number, valor: number) {
    this.memoria[dir] = valor;
  }
}
