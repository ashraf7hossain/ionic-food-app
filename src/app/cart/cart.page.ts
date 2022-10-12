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

  }

  onSearch(value:any){
    this.router.navigate(['/display', value]);
  }

  onConfirm(){
    this.router.navigate(['/payment',]);
  }

  addQuantity(cartProduct:any){
    this.totalAddedProduct++;
    for(let cp  of this.cartProducts){
      if(cp._id == cartProduct._id){ 
          cp.quantity++;
          cp.subtotal = +cp.unitPrice  +  +cp.subtotal;
          this.total += +cp.unitPrice;
          this.grandTotal += +cp.unitPrice;  
          this.cartApi.editCartProduct(cartProduct._id, cp).subscribe(); 
         // console.log("Akn cart", this.auth.getUser());
          return; 
      }
    }
  }

  minusQuantity(cartProduct:any){
    if( cartProduct.quantity == 1){
        this.deleteCartProduct(cartProduct);
        return;
    }
    this.totalAddedProduct--;
    for(let cp  of this.cartProducts){
      if(cp._id == cartProduct._id){ 
          cp.quantity--;
          cp.subtotal =  +cp.subtotal -  +cp.unitPrice;  
          this.total -= +cp.unitPrice;
          this.grandTotal -= +cp.unitPrice;
          this.cartApi.editCartProduct(cartProduct._id, cp).subscribe(); 
          return; 
      }
    }

  }

  deleteCartProduct(cartProduct:any){
    
      this.total -= +cartProduct.subtotal;
      this.grandTotal -= +cartProduct.subtotal;
      this.totalAddedProduct -= +cartProduct.quantity;

      this.cartApi.deleteCartProduct(cartProduct).subscribe(); //external server theke delete
      const indexOfObject = this.cartProducts.findIndex((object) => {
        return object === cartProduct;
      });  
      this.cartProducts.splice(indexOfObject, 1);//internal array theke delete*/
  }

}
