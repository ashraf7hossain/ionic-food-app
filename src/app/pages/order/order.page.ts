import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  orders:any = {};
  total:number = 0;

  constructor(private acr : ActivatedRoute) { }

  ngOnInit() {
    this.acr.queryParams.subscribe(res =>{
      this.orders = JSON.parse(res['orderItem']);
        this.total = this.orders.reduce((a,b)=>(a+b.price * b.quantity),0);
    })
  }

}
