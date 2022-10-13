import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllfoodsPage } from './allfoods.page';

const routes: Routes = [
  {
    path: '',
    component: AllfoodsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllfoodsPageRoutingModule {}
