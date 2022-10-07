import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { DisplayPageRoutingModule } from './display-routing.module';

import { DisplayPage } from './display.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayPageRoutingModule,
    HttpClientModule
  ],
  declarations: [DisplayPage]
})
export class DisplayPageModule {




}
