import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-allfoods',
  templateUrl: './allfoods.page.html',
  styleUrls: ['./allfoods.page.scss'],
})
export class AllfoodsPage implements OnInit {
  products: any[] = [];
  cart: any[] = [];
  params:string = "";
  cartCount:number = 0;

  constructor(private prd : ProductService,
              private acr: ActivatedRoute,
              private loc: Location) { }

  ngOnInit() {
    this.prd.currentCart.subscribe(res => {
      this.cart = res;
    });
    this.prd.currentCartCount.subscribe(res => this.cartCount = res);
    this.acr.queryParams.subscribe(res => {
      this.params = res['cat'];
      console.log(this.params);
    })
    this.prd.getAllProducts().subscribe(res => {
      let arr = Object.entries(res);
      for (let [x, y] of arr) {
        this.products.push(y);
      }
      if(this.params !== undefined){
        this.products = this.products.filter(p => p.category === this.params);
      }
    });
  }

  addToCart(item:any){
    this.prd.addToCart(item);
  }

  goBack(){
    this.loc.back();
  }
  

}
