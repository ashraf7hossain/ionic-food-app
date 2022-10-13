import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ProductService } from 'src/app/services/product.service';




@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message = "hello world";
  name:string;


  constructor(private prd: ProductService) { }
  total:number = 0;
  cart:any[] = [];

  ngOnInit() {
    this.prd.currentCart.subscribe(res => {
      this.cart = res;
      this.total = this.cart.reduce((a, b) => (a + b.quantity * b.price),0);
    });
  }

  changeQuantity(item:any, value:number){
    this.prd.changeQuantity(item,value);
    this.total = this.cart.reduce((a, b) => (a + b.quantity * b.price),0);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
