import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { find } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private cart = new BehaviorSubject<any[]>([]);
  private cartCount = new BehaviorSubject<number>(0);
  private favCount = new BehaviorSubject<number>(0);
  private favorite = new BehaviorSubject<any[]>([]);

  currentCart = this.cart.asObservable();
  currentCartCount = this.cartCount.asObservable();
  currentfavCount = this.favCount.asObservable();
  currentFavorite = this.favorite.asObservable();

  getAllProducts(): Observable<any> {
    return this.http.get<any[]>(`${environment.baseURL}/products.json`);
  }
  getAllOrders(): Observable<any>{
    return this.http.get<any[]>(`${environment.baseURL}/orders.json`);
  }
  tempCount: number = 0;
  addToCart(product: any) {
    let temp: any[] = [];
    this.currentCart.subscribe(res => {
      temp = res;
    });
    if (temp.includes(product)) {
      return;
    }
    this.tempCount += 1;
    temp.push(product);
    this.cartCount.next(this.tempCount);
    this.cart.next(temp);
  }
  changeQuantity(product: any, value: number) {
    let temp: any[] = [];
    this.currentCart.subscribe(res => {
      temp = res;
    });
    if (product.quantity === 1 && value === -1) {
      temp = temp.filter(c => c.id !== product.id);
      this.tempCount = temp.reduce((a,b) => (a + b.quantity),0);
      this.cartCount.next(this.tempCount);
      this.cart.next(temp);
      return;
    }
    product.quantity += value;
    this.tempCount = temp.reduce((a,b)=>(a + b.quantity),0);
    this.cartCount.next(this.tempCount);
  }
  
  replaceQuantity(product:any){
    let temp: any[] = [];
    this.currentCart.subscribe(res => {
      temp = res;
    });
    for(let x of temp){
      if(x.id === product.id){
        x = product;      
      }
    }
    this.tempCount = temp.reduce((a,b)=>(a + b.quantity),0);
    this.cartCount.next(this.tempCount);
  }
  clearCart(){
    this.cart.next([]);
    this.cartCount.next(0);
  }


  addToFav(item: any) {
    let temp = [];
    this.currentFavorite.subscribe(res => {
      temp = res;
    });
    let id = temp.find(f => item === f);
    console.log(id);
    if (id === undefined) {
      temp.push(item);
    } else {
      temp = temp.filter(t => t !== item);
    }
    this.favCount.next(temp.length);
    this.favorite.next(temp);
  }
  removeFromFav(item: any){
    let temp = [];
    this.currentFavorite.subscribe(res => {
      temp = res;
    });
    temp = temp.filter(t => t !== item);
    this.favCount.next(temp.length);
    this.favorite.next(temp);
  }
}
