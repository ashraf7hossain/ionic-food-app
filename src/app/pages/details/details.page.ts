import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  params: string = "";
  currentProduct: any = {};
  toggle:boolean = false;
  buynow:boolean = false;

  constructor(private acr: ActivatedRoute,
    private prd: ProductService) { }

  ngOnInit() {
    this.acr.queryParams.subscribe(res => {
      this.params = res['id'];
    });
    this.prd.getAllProducts().subscribe(res => {
      let arr = Object.entries(res);
      let temp:any[] = [];
      for (let [x, y] of arr) {
        temp.push(y);
      }
      this.currentProduct = temp.find(p => p.id === this.params);
      
    });
  }
  addToCart(){
    this.toggle = !this.toggle;
    this.prd.addToCart(this.currentProduct);
  }
  buyNow(){
    this.buynow = !this.buynow;
  }
  changeQuantity(val:number){
    this.prd.changeQuantity(this.currentProduct,val);
  }

}
