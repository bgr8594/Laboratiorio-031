import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {
  recetas: Receta[];

  constructor(private recetaService: RecetasService) { }



  ngOnInit() {

    this.recetas = this.recetaService.getRecetas();

  }
}

