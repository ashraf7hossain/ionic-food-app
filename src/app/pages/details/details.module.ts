import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartModalComponent } from 'src/app/components/cart-modal/cart-modal.component';

import { ReactiveFormsModule } from '@angular/forms';

import { DetailsPageRoutingModule } from './details-routing.module';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';


import { DetailsPage } from './details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetailsPage , BackButtonComponent,HeaderComponent,
  CartModalComponent]
})
export class DetailsPageModule {}
