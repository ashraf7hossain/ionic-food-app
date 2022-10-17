import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
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

  constructor( private prd: ProductService,
               private auth: AuthService,
               private toast: ToastController
               ) { }
  cart: any[] = [];
  total: number = 0;

  orderForm: FormGroup = new FormGroup({});
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
  }

  changeQuantity(item:any, value:number){
    this.prd.changeQuantity(item,value);
    this.total = this.cart.reduce((a, b) => (a + b.quantity * b.price),0);
  }
  cancelOrderModal(){
    this.isModalOpen = false;
  }
  confirm() {
    // this.modal.dismiss(this.name, 'confirm');
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
  async orderSubmit(){
    await this.presentToast('top' , "Order Succesfully placed");
    this.orderForm.reset();
    // console.log(this.orderForm.value);

  }

}
