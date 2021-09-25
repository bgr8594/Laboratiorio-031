import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();


  constructor(private autSvc: AuthserviceService,
    private route: Router) { }

  ngOnInit() {
  }
  async onRegister(){
    const user = await this.autSvc.onRegister(this.user);
    if(user){
      console.log('Succesful');
      this.route.navigate(['/home']);
    }
  }
}
