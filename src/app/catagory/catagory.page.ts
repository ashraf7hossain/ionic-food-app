import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { CartService } from '../services/cart.service';
import { CatagoryApiService } from 'services/catagory-api.service';

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.page.html',
  styleUrls: ['./catagory.page.scss'],
})
export class CatagoryPage implements OnInit {

   totalAddedProduct: number = 0;
   catagories: any[];
 
   constructor(private http: HttpClient, 
     private cartApi: CartService,
     private catagoryApi: CatagoryApiService,
     private router:Router,
     private auth: AuthorizationService) {}
 
  ngOnInit(){
 
     this.cartApi.getCartProducts().subscribe( (response:any)=>{ 
       let allCartProducts = response.data;
       for(let cp of allCartProducts){
          if( cp.userID == this.auth.getUserPayload().sub){
              this.totalAddedProduct += +cp.quantity;
          }
       } 
     });    

     this.catagoryApi.getCatagories().subscribe(  (response:any)=>{
         this.catagories = response.data;
     } )

     

  }

  onSearch(value:any){
    console.log(value);
    this.router.navigate(['/display', value]);
  }

  onCart(){
    console.log("Asce ekhane!!");
    this.router.navigate(['/cart']);
  }



}
