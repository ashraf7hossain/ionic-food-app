import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  isModalOpen:boolean = false;
  isPaymentOpen:boolean = false;
  success:boolean = false;

  currentUser:any = {};

  constructor( private prd: ProductService,
               private auth: AuthService,
               private toast: ToastController,
               private route: Router
               ) { }
  cart: any[] = [];
  total: number = 0;

  orderForm: FormGroup = new FormGroup({});
  paymentForm: FormGroup = new FormGroup({});
  ngOnInit() {
    this.prd.currentCart.subscribe(res => {
      this.cart = res;
      this.total = this.cart.reduce((a , b) => (a + b.quantity * b.price), 0)
    });
    this.orderForm = new FormGroup({
      delivery: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      zip: new FormControl('',[Validators.required]),
    });
    this.paymentForm = new FormGroup({
      card: new FormControl('',[Validators.required])
    });
    this.auth.currentUser.subscribe(res => this.currentUser = res);
  }

  changeQuantity(item:any, value:number){
    this.prd.changeQuantity(item,value);
    this.total = this.cart.reduce((a, b) => (a + b.quantity * b.price),0);
  }
  cancelOrderModal(){
    this.isModalOpen = false;
  }
  cancelPaymentModal(){
    this.isPaymentOpen = false;
  }
  cancelSuccess(){
    // this.route.navigate(['home']);
    this.success = false;
    // this.isModalOpen = false;
    // this.isPaymentOpen = false;
    // console.log(this.success,this.isModalOpen,this.isPaymentOpen);
  }
  confirm() {
    this.auth.currentUser.subscribe(async res => {
      if(res.hasOwnProperty('email')){
        this.isModalOpen = true;
      }else{
        await this.presentToast('top', "Please Login First");
      }
    })
  }
  async presentToast(position: 'top' , message){
    const tst = await this.toast.create({
      message: message,
      duration: 1500,
      position: position
    });
    await tst.present();
  }
  orderSubmit(){
    // await this.presentToast('top' , "Order Succesfully placed");
    // this.orderForm.reset();
    this.isPaymentOpen = true;
    // console.log(this.orderForm.value);
  }
  placeOrder(){
    // e.preventDefault();
    let order = {
      item: [...this.cart],
      total: this.total,
      userId: this.currentUser.id,
      name: this.orderForm.value['delivery'],
      card: this.paymentForm.value['card'],
      address: this.orderForm.value['city']+","+this.orderForm.value['zip'],
      date: Date.now()
    }
    this.auth.registerOrder(order);
    this.success = true;
  }

}
