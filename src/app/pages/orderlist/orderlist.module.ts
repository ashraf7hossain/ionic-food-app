import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderlistPageRoutingModule } from './orderlist-routing.module';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';

import { OrderlistPage } from './orderlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderlistPageRoutingModule
  ],
  declarations: [OrderlistPage, HeaderComponent, BackButtonComponent]
})
export class OrderlistPageModule {}
