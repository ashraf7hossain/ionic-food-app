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
 // trendingProdducts:any[] = [];
  sliders: any[] = [];
  totalAddedProduct: number = 0;
  catagories: any[];
  name:string;

  constructor(private http: HttpClient, 
    private cartApi: CartService,
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
   this.http.get<any[]>(`http://localhost:3030/products`).subscribe( (res:any) =>{
     this.products = res.data;
  });

 

   this.cartApi.getCartProducts().subscribe(  (cartProducts)=>{
    this.cartApi.getCartProducts().subscribe(  (res)=>{
         let cartProducts = res.data;
         for( let cp of cartProducts){
             if( cp.userID == this.auth.getUserPayload().sub){
                this. totalAddedProduct += cp.quantity;
             }
         }    
    })
})

  }


  slideOptions = {
    slidesPerView: 1.5,
    // centeredSlides: true,
    loop: true,
    spaceBetween: 10,
  }

  onCart(){
    console.log("Asce ekhane!!");
    this.router.navigate(['/cart']);
  }




  onSearch(value:any){
    console.log(value);
    this.router.navigate(['/display', value]);
  }


  onAddToCart(product: any){
        
    this.totalAddedProduct++;
    this.cartApi.getCartProducts().subscribe(  (res:any)=>{ //always subscriber er vitorei kaj korte hoy noile problem kore
      let arr:any[] = res.data;
      for(let cp of arr){
              console.log("Enterred!!!!");
              if(cp.productID == product._id   && cp.userID == this.auth.getUserPayload().sub){ //already exist,
                  console.log("Existed");
                  cp.quantity++;
                  cp.subtotal = +cp.unitPrice  + +cp.subtotal;  
                
                  this.cartApi.editCartProduct(cp._id, cp).subscribe(); 
                  return; 
              }
    } 

    
    let newCartProduct = {} as any;
   
    newCartProduct.userID = this.auth.getUserPayload().sub; newCartProduct.brand=product.brand;
    newCartProduct.name=product.name;  newCartProduct.imageURL=product.imageURL;
    newCartProduct.unitPrice=product.unitPrice; newCartProduct.quantity=1;
    newCartProduct.subtotal=product.unitPrice;
    newCartProduct.productID = product._id; //! means it not null for sure

    this.cartApi.addCartProduct( newCartProduct  ).subscribe();

})


}
}