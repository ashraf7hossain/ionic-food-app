import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.page.html',
  styleUrls: ['./admin-products.page.scss'],
})
export class AdminProductsPage implements OnInit {

  products: any[] = [];
  constructor(private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>(`http://localhost:3030/products`).subscribe( (res:any) =>{
      this.products = res.data;
     
    });
  }

}
