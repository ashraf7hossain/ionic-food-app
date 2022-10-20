import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule
  ],
  declarations: [UserPage,HeaderComponent,BackButtonComponent]
})
export class UserPageModule {}
