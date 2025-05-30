
export class BusSistema {
  direccion: number = 0;
  dato: number = 0;

  enviarDireccion(dir: number) { this.direccion = dir; }
  enviarDato(dato: number) { this.dato = dato; }
}
