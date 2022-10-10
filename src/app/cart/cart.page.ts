import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'services/authorization.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

 cartProducts: any[] = [];
 totalAddedProduct:number = 0;
 total:number = 0;
 tax:number = 3;
 grandTotal:number = 3;

  constructor(private router:Router, private cartApi:CartService,
              private auth: AuthorizationService) { }

  ngOnInit() {
      let allCartProducts:any[] = [];
      this.cartApi.getCartProducts().subscribe( (response:any)=>{ 
        allCartProducts = response.data;
        for(let cp of allCartProducts){
           if( cp.userID == this.auth.getUserPayload().sub){
               this.cartProducts.push( cp );
               this.totalAddedProduct += +cp.quantity;
               this.total += +cp.subtotal;
               this.grandTotal += +cp.subtotal;
           }
        } 
      });   
  }

  onCart(){
    console.log("Asce ekhane!!");
  }

  onSearch(value:any){
    console.log(value);
    this.router.navigate(['/display', value]);
  }

}
