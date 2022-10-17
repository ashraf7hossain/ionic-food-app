import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';




@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message = "hello world";
  name:string;

  orderForm:FormGroup = new FormGroup({});


  constructor(private prd: ProductService,
              private auth: AuthService,
              private toast: ToastController,
              private mdl : ModalController) { }
  total:number = 0;
  cart:any[] = [];
  isModalOpen:boolean = false;

  ngOnInit() {
    this.prd.currentCart.subscribe(res => {
      this.cart = res;
      this.total = this.cart.reduce((a, b) => (a + b.quantity * b.price),0);
    });
    this.orderForm = new FormGroup({
      delivery: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      zip: new FormControl('',[Validators.required]),
    });
  }

  changeQuantity(item:any, value:number){
    this.prd.changeQuantity(item,value);
    this.total = this.cart.reduce((a, b) => (a + b.quantity * b.price),0);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  cancelOrderModal(){
    this.isModalOpen = false;
  }
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.auth.currentUser.subscribe(async res => {
      if(res.hasOwnProperty('email')){
        this.isModalOpen = true;
      }else{
        await this.presentToast('top', "Please Login First");
      }
    })

  }
  async presentToast(position: 'top', message: string){
    const tst = await this.toast.create({
      message: message,
      duration: 1500,
      position: position
    });
    await tst.present();
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  async orderSubmit(){
    await this.presentToast('top' , "Your order successfully placed");
    console.log(this.orderForm.value);
  }

}
