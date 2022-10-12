import { Component,OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonModal } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AuthorizationService } from 'services/authorization.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChild(IonModal) modal: IonModal;

  products:any[] = [];
  sliders: any[] = [];
  totalAddedProduct: number = 0;
  cartProducts: any[] = [];
  catagories: any[];
  name:string;

  constructor(private http: HttpClient, 
    private cartService: CartService,
    private router:Router,
    private auth: AuthorizationService) {}

    slideOptions = {
      slidesPerView: 1.5,
      loop: true,
      spaceBetween: 10,
    }

    ngOnInit(){
            
            this.http.get<any[]>(`http://localhost:3030/products`).subscribe( (res:any) =>{
              this.products = res.data;
             
            });

            this.cartService.getCartProducts().subscribe(  (cartProducts)=>{
              this.cartService.getCartProducts().subscribe(  (res)=>{
                   this.cartProducts = res.data;
                   for( let cp of this.cartProducts){
                       if( cp.userID == this.auth.getUserPayload().sub){
                          this. totalAddedProduct += cp.quantity;
                       }
                   }    
              })
            })
    }


 

  onCart(){
    console.log("Asce");
    this.router.navigate(['/cart']);
  }




  onSearch(value:any){
    this.router.navigate(['/display', value]);
  }


onAddToCart(product: any){
        
    this.totalAddedProduct++;
    this.cartService.getCartProducts().subscribe(  (res:any)=>{ //always subscriber er vitorei kaj korte hoy noile problem kore
      let arr:any[] = res.data;
      for(let cp of arr){
              if(cp.productID == product._id   && cp.userID == this.auth.getUserPayload().sub){ //already exist,
                  cp.quantity++;
                  cp.subtotal = +cp.unitPrice  + +cp.subtotal;  
                
                  this.cartService.editCartProduct(cp._id, cp).subscribe(); 
                  return; 
              }
      } 

    
    let newCartProduct = {} as any;
   
    newCartProduct.userID = this.auth.getUserPayload().sub; newCartProduct.brand=product.brand;
    newCartProduct.name=product.name;  newCartProduct.imageURL=product.imageURL;
    newCartProduct.unitPrice=product.unitPrice; newCartProduct.quantity=1;
    newCartProduct.subtotal=product.unitPrice;
    newCartProduct.productID = product._id; //! means it not null for sure

    this.cartService.addCartProduct( newCartProduct  ).subscribe();

})


}

}