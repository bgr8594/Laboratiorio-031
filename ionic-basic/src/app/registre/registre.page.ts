import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.page.html',
  styleUrls: ['./registre.page.scss'],
})
export class RegistrePage implements OnInit {
  user: User = new User();
  constructor(private autSvc: AuthserviceService,
    private router: Router) { }

  ngOnInit() {
  }

  async onRegister(){
    const user = await this.autSvc.onRegistrer(this.user);
    if(user){
      console.log('Successfully created user!');
      this.router.navigate(['/home']);
    }
  }
}
