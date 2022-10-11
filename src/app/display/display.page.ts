import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { ProductApiService } from 'services/product-api.service';
import { CartService } from '../services/cart.service';
import { AuthorizationService } from 'services/authorization.service';


@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

  searchedPr:string;
  totalAddedProduct: number = 0;
  displayProducts: any[] = [];
  constructor(private router:Router, private route:ActivatedRoute,
    private auth:AuthorizationService,
    private cartApi:CartService,
        private http: HttpClient  ) { }


  searchAction(){
    let str = this.route.snapshot.paramMap.get('search');
    this.searchedPr = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    console.log("Edited value: ", this.searchedPr);
    let products: any[] = [];
    if( this.searchedPr ){
      this.http.get<any[]>(`http://localhost:3030/products`).subscribe(  (res:any)=>{
           products = res.data;
          
           for(let pr of products){
               if( pr.name.includes(this.searchedPr) )this.displayProducts.push(pr);
               if( pr.catagory.includes(this.searchedPr) )this.displayProducts.push(pr);
           }
       })   
    }
  }

  ngOnInit() {
    let allCartProducts:any[] = [];
    this.cartApi.getCartProducts().subscribe( (response:any)=>{ 
      allCartProducts = response.data;
      for(let cp of allCartProducts){
         if( cp.userID == this.auth.getUserPayload().sub){
           
             this.totalAddedProduct += +cp.quantity;
           
         }
      } 
    });   
     this.searchAction();
  }

  onSearch(value:any){
     this.displayProducts = [];
     this.searchAction();
  }

  addToCart(item:any){
   
  }

}
