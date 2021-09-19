import { Injectable } from '@angular/core';
import { User } from '../shared/user.class';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoged: any = false;
  constructor(public afAuth: AngularFireAuth) {

   }

  async onLogin(user: User){
    try{
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    }catch(error){
      console.log('Errors en login ->', error);
      return error; 
    }
  }

  async onRegister(user: User){
    try{
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    }catch(error){
      console.log('Error en register ->', error);
      return error;
    }
  }

}
