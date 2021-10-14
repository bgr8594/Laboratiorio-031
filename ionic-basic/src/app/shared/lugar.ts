export class Lugar {
  id?: string;
  nombre: string;

  ubicacion?: {latitud: string; longitud: string};

  constructor(){

    this.nombre = '';
  }

  public setubicacion(latitud: string, longitud: string){

    this.ubicacion.latitud = latitud;
    this.ubicacion.longitud = longitud;

  }

}
