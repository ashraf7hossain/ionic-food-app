import { Component,OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ProductService } from '../services/product.service';
// import { Observable, map, BehaviorSubject} from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChild(IonModal) modal: IonModal;
  products:any[] = [];
  tempProducts:any[] = [];
  cart:any[] = [];
  favs:any[] = [];
  message = "hello world";
  name:string;
  cartCount: number = 0;
  cls:any = {
    'all' : true,
    'food' : false,
    'drink' : false
  };
  search:string = "";
  heart:string = "heart-outline";

  constructor(private http: HttpClient, private prd: ProductService) {}

  slideOptions = {
    freeMode: true,
    centeredSlides: true,
    loop: true,
    slidesOffsetBefore: 11,
    spaceBetween: 10,
    pager: true
  }
  ngOnInit(){
   this.prd.currentFavorite.subscribe(res => this.favs = res);
   this.http.get<any[]>(`${environment.baseURL}/products.json`).subscribe(res =>{
     let arr = Object.entries(res);
    for(let [x,y] of arr){
      this.products.push(y);
    }
    this.tempProducts = this.products;
    console.log(this.products);
   });
  }

  
  addToCart(item:any){
    if(this.cart.includes(item)){
      return;
    }
    this.cartCount += 1;
    this.cart.push(item);
  }
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  changeQuantity(product:any,value:number){
    product.quantity += value;
    this.cartCount += value;
    if(product.quantity === 0){
      this.cart = this.cart.filter(c => c.id !== product.id);
      console.log(this.cart);
      return;
    }
  }
  filter(category:string){
    let clsArr = Object.keys(this.cls);

    for(let x of clsArr){
      this.cls[x] = false;
    }
    
    this.cls[category] = true;
    this.products = this.tempProducts;
    if(category === 'all'){
      this.products = this.tempProducts;
      return;
    }
    this.products = this.products.filter(prod => prod.category === category);
  }

}
