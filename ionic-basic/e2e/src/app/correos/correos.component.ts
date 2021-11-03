import { Component, OnInit } from '@angular/core';
import { Correo } from './correo';

@Component({
  selector: 'app-correos',
  templateUrl: './correos.component.html',
  styleUrls: ['./correos.component.scss'],
})
export class CorreosComponent implements OnInit {

  private _filtrarCorreos: string = '';

  correosFiltrados: Correo[] = [];

  correos: Correo[] = [{
    titulo: "Barney The Best",
    remitente: "Shomeryail@gmail.com",
    contenido: "Barney es un dinosaurio que vive en nustra mente Y cuando se hace grande Es realmente sorprendente! El le brinda su amistadxc A grandes y pequeños Después de la escuela Juegan todos muy contentos! Barney nos enseña Muchos juegos divertidos",
    leido: false,
    fechaRecibido: "2019-11-01T15:43:40.394Z"
  },
  {
    titulo: "hello, world",
    remitente: "aracely.des@uanl.edu.mx",
    contenido: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    leido: false,
    fechaRecibido: "2019-10-01T15:43:40.394Z"
  },
  {
    titulo: "Recibo de la luz",
    remitente: "Shomeryail@gmail.com",
    contenido: "Ya valio no pagaste la luz, favor de pagarla lo mas pronto posible para no recibir un corte del servicio, puede pagar en nuestra sucursal mas cercana o si bien en cualquier oxxo de su preferecia, gracias de antemano CFE",
    leido: true,
    fechaRecibido: "2019-12-01T15:43:40.394Z"
  }
]


//1. Agregar filtrado de correos basado en 
filtroCorreos(filtrarPor: string): Correo[]{
  filtrarPor = filtrarPor.toLocaleLowerCase();
  return this.correos.filter((correo: Correo) =>correo.fechaRecibido.toLocaleLowerCase().includes(filtrarPor));
}

get filtrarCorreos(): string{
  return this._filtrarCorreos;
}

set filtrarCorreos(value: string){
  this._filtrarCorreos = value;
  console.log(value);
  this.correosFiltrados = this.filtroCorreos(value);
  console.log(this.correosFiltrados);
}

buscando(fecha : string){
  alert("Buscando fecha : " +(fecha).substring(10,-1));
  this.filtrarCorreos=(fecha).substring(10,-1);
}

//2. Ordenar basado en fecha

asc(){
  this.correosFiltrados.sort((a, b) => new Date(b.fechaRecibido).getTime() - new Date(a.fechaRecibido).getTime());
}

desc(){
  this.correosFiltrados.sort((b, a) => new Date(b.fechaRecibido).getTime() - new Date(a.fechaRecibido).getTime());
}



  constructor() { }

  ngOnInit(): void {
    this.filtrarCorreos = '';
  }

}