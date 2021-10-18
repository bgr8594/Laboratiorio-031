import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    GooglemapsModule
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[GooglemapsModule]
})
export class GooglemapsModule { }
