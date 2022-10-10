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
  trendingProdducts:any[] = [];
  sliders: any[] = [];
  totalAddedQuantity: number = 0;
  catagories: any[];
  name:string;

  constructor(private http: HttpClient, 
    private cartService: CartService,
    private router:Router,
    private auth: AuthorizationService) {}

  ngOnInit(){
   this.http.get<any[]>(`http://localhost:3030/products`).subscribe( (res:any) =>{
     this.products = res.data;
     for(let pr of this.products){
        if( pr.isTrending )
            this.trendingProdducts.push( pr );
     }
  });

   this.http.get<any[]>(`http://localhost:3030/sliders`).subscribe( (res:any) =>{
     this.sliders = res.data;
   });

   this.http.get<any[]>(`http://localhost:3030/catagories`).subscribe( (res:any) =>{
     this.catagories = res.data;
   });

   this.cartService.getCartProducts().subscribe(  (cartProducts)=>{
    this.cartService.getCartProducts().subscribe(  (res)=>{
         let cartProducts = res.data;
         for( let cp of cartProducts){
             if( cp.userID == this.auth.getUserPayload().sub){
                this. totalAddedQuantity += cp.quantity;
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
        
    this.totalAddedQuantity++;
    this.cartService.getCartProducts().subscribe(  (res:any)=>{ //always subscriber er vitorei kaj korte hoy noile problem kore
      let arr:any[] = res.data;
      for(let cp of arr){
              console.log("Enterred!!!!");
              if(cp.productID == product._id   && cp.userID == this.auth.getUserPayload().sub){ //already exist,
                  console.log("Existed");
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