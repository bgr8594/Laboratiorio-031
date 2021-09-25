import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private auySvc: AuthserviceService,
    private router: Router,
    private afAuth: AngularFireAuth) {}

onLogout()
{
  console.log('logout');
  this.afAuth.auth.signOut();

  this.router.navigateByUrl('/login');
}

}
