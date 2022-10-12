import { Component,OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
// import { Observable, map, BehaviorSubject} from 'rxjs';

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
  cart:any[] = [];
  catagories: any[];
  name:string;

  constructor(private http: HttpClient) {}

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

  }
  addToCart(item:any){
    this.cart.push(item);
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  slideOptions = {
    slidesPerView: 1.5,
    // centeredSlides: true,
    loop: true,
    spaceBetween: 10,
  }
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    
  }

}