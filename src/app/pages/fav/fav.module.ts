import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavPageRoutingModule } from './fav-routing.module';

import { FavPage } from './fav.page';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavPageRoutingModule
  ],
  declarations: [FavPage,HeaderComponent,BackButtonComponent]
})
export class FavPageModule {}
