export class Lugar {
    id?: string;
    nombre: string;
    latitud: number;
    longitud: number;

    ubication?:{latitud:string, longitud:string}



    constructor(){

        this.nombre=''

    }

    public setUbicacion(Latitud:string, Longitud:string){

        this.ubication.latitud= Latitud;

        this.ubication.longitud= Longitud

    }
    
}
