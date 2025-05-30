// src/core/io/DispositivosIO.ts
export class DispositivosIO {
  entrada: number = 0;
  salida: number = 0;

  leerEntrada(): number { return this.entrada; }
  escribirSalida(valor: number) { this.salida = valor; }
}
