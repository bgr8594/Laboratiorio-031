import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AlumnosPage } from '../alumnos/alumnos.page';
import { RecetasPage } from '../recetas/recetas.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  tabs1 : any = AlumnosPage;
  tabs2:  any = RecetasPage;
  constructor(private navController: NavController, private navParams: NavParams) { }

  ngOnInit() {
  }

}
