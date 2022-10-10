import { Component, OnInit } from '@angular/core';
import { ProductApiService } from 'src/app/services/product-api.service';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { OrderProduct } from 'src/app/models/orderProduct';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { OrderApiService } from 'src/app/services/order-api.service';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  cartProducts: any[] = [];
  total:number = 0;
  shipping:number = 3;
  grandTotal:number = 3;
  totalAddedQuantity: number = 0;
  user: User = {} as User;

  constructor(private router:Router,
    private cartService: CartService,
    private orderService: OrderService,
    private orderApi: OrderApiService,
    private auth:  AuthorizationService,
    private userApi: UserApiService,
    private productApi: ProductApiService) { }

    ngOnInit(): void {

      this.cartService.getCartProducts().subscribe(  (res)=>{
           let arr:any[] = res.data;
           for(let cp of arr){
               if( cp.userID == this.auth.getUserPayload().sub){
                    this.cartProducts.push(cp);
                    this.total +=  +cp.subtotal;
                    this.grandTotal += +cp.subtotal;
               }
           }
      })
  
      this.cartService.getCartProducts().subscribe(  (cartProducts)=>{
        this.cartService.getCartProducts().subscribe(  (res)=>{
             this.cartProducts = res.data;
             for( let cp of this.cartProducts){
                 if( cp.userID == this.auth.getUserPayload().sub){
                    this.totalAddedQuantity += cp.quantity;
                 }
             }    
        })
      })
    }

    onCheckout(){ 
      
      this.user._id = this.auth.getUserPayload().sub;
      this.userApi.getUser(this.user._id).subscribe(  (currentUser)=> {
       
       
        let newOrder:Order = {
              userID: this.auth.getUserPayload().sub,
              userAddress: currentUser.address,
              userPhone: currentUser.phone,
              status : "Pending",
              totalAddedQuantity : this.totalAddedQuantity,
              grandTotal: this.grandTotal
        }
          
        this.orderApi.addOrder(  newOrder ).subscribe( (addedOrder)=>{
          
            for(let cp of this.cartProducts){            
                  this.cartService.deleteCartProduct(cp).subscribe(  ()=>{
                    const indexOfObject = this.cartProducts.findIndex((object) => {
                      return object === cp;
                    });  
                    this.cartProducts.splice(indexOfObject, 1);//internal array theke delete
                  } );
            }
            this.totalAddedQuantity = 0;
        });    
      
    });

  } 

}
