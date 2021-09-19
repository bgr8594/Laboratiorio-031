import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.class';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();

  constructor(private autSvc: AuthService, private router: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async onLogin(){
    const User = await this.autSvc.onLogin(this.user);
   
  }

}
