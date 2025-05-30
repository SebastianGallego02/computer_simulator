export class ManejadorInterrupciones {
  interrupciones: number[] = [];

  agregarInterrupcion(tipo: number) {
    this.interrupciones.push(tipo);
  }
  procesarInterrupciones() {
    // Procesa y limpia la primera interrupción de la cola
    if (this.interrupciones.length > 0) {
      const int = this.interrupciones.shift();
      // Lógica de manejo
    }
  }
}
