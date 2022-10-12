import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderApiService } from 'services/order-api.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.page.html',
  styleUrls: ['./admin-orders.page.scss'],
})
export class AdminOrdersPage implements OnInit {

  orders: any[] = [];

  constructor(
      private router: Router,
      private orderApi: OrderApiService
  ) { }

  ngOnInit() {
     this.orderApi.getOrders().subscribe( (response:any)=>{
          this.orders = response.data; 
     })
  }

}
