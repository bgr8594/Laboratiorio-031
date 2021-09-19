import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
})
export class ModalErrorComponent implements OnInit {

  constructor(private navParams: NavParams) { }

  ngOnInit() {}

}
