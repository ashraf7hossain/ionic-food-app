import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatagoryPageRoutingModule } from './catagory-routing.module';

import { CatagoryPage } from './catagory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatagoryPageRoutingModule
  ],
  declarations: [CatagoryPage]
})
export class CatagoryPageModule {}
