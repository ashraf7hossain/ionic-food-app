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
  private favorite = new BehaviorSubject<any[]>([]);

  currentCart = this.cart.asObservable();
  currentCartCount = this.cartCount.asObservable();
  currentFavorite = this.favorite.asObservable();

  getAllProducts(): Observable<any> {
    return this.http.get<any[]>(`${environment.baseURL}/products.json`);
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
      this.tempCount += value;
      this.cartCount.next(this.tempCount);
      temp = temp.filter(c => c.id !== product.id);
      this.cart.next(temp);
      return;
    }
    product.quantity += value;
    this.tempCount += value;

    this.cartCount.next(this.tempCount);
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
  
    this.favorite.next(temp);
  }
}
