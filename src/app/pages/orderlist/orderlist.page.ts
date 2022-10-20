import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.page.html',
  styleUrls: ['./orderlist.page.scss'],
})
export class OrderlistPage implements OnInit {

  orders: any[] = [];
  currentUser: any = {};
  constructor(private auth: AuthService,
    private prd: ProductService,
    private router: Router) { }


  ngOnInit() {
    this.auth.getAllUsers();
    this.auth.currentUser.subscribe(res => {
      this.currentUser = res;
      this.prd.getAllOrders().subscribe(res2 => {
        let arr = Object.entries(res2);
        for (let [x, y] of arr) {
          this.orders.push(y);
        }
        this.orders = this.orders.filter(o => o.userId === this.currentUser.id);
      })
    });
  }

  goto(items){
    this.router.navigate(['/order'],
    {
      queryParams: {
        orderItem: JSON.stringify(items)
      }
    }
    )
  }
}
