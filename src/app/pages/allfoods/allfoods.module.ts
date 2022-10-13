import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { CartModalComponent } from 'src/app/components/cart-modal/cart-modal.component';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';

import { IonicModule } from '@ionic/angular';

import { AllfoodsPageRoutingModule } from './allfoods-routing.module';

import { AllfoodsPage } from './allfoods.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllfoodsPageRoutingModule
  ],
  declarations: [AllfoodsPage,HeaderComponent,CartModalComponent,BackButtonComponent]
})
export class AllfoodsPageModule {}
