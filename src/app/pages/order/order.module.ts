import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';

import { OrderPage } from './order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule
  ],
  declarations: [OrderPage,BackButtonComponent,HeaderComponent]
})
export class OrderPageModule {}
