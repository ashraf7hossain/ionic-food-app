import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    // loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    children: [
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
      {
        path: 'allfoods',
        loadChildren: () => import('./pages/allfoods/allfoods.module').then(m => m.AllfoodsPageModule)

      },
      {
        path: 'signup',
        loadChildren: () => import('./pages/allfoods/allfoods.module').then(m => m.AllfoodsPageModule)

      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'allfoods',
    loadChildren: () => import('./pages/allfoods/allfoods.module').then(m => m.AllfoodsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'fav',
    loadChildren: () => import('./pages/fav/fav.module').then( m => m.FavPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'orderlist',
    loadChildren: () => import('./pages/orderlist/orderlist.module').then( m => m.OrderlistPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./pages/order/order.module').then( m => m.OrderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
