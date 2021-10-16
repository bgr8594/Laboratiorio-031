import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth'
import {AngularFirestoreModule} from 'angularfire2/firestore'
import { environment } from 'src/environments/environment';

import { IonicModule, IonicRouteStrategy, NavParams} from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentesModule } from './componentes/componentes.module';
import { ModalErrorComponent } from './modal-error/modal-error.component';

@NgModule({
  declarations: [AppComponent, ModalErrorComponent],
  entryComponents: [],
  imports: [ComponentesModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, 
  AngularFireModule.initializeApp(environment.firebaseConfig), 
AngularFireAuthModule, AngularFirestoreModule],
  providers: [NavParams, HttpClientModule, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
