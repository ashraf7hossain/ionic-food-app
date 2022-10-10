import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { ProductApiService } from 'services/product-api.service';


@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

  searchedPr:string;
  displayProducts: any[] = [];
  constructor(private router:Router, private route:ActivatedRoute,
        private http: HttpClient  ) { }


  searchAction(){
    let str = this.route.snapshot.paramMap.get('search');
    this.searchedPr = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    console.log("Edited value: ", this.searchedPr);
    let products: any[] = [];
    if( this.searchedPr ){
      this.http.get<any[]>(`http://localhost:3030/products`).subscribe(  (res:any)=>{
           products = res.data;
          
           for(let pr of products){
               if( pr.name.includes(this.searchedPr) )this.displayProducts.push(pr);
               if( pr.catagory.includes(this.searchedPr) )this.displayProducts.push(pr);
           }
       })   
    }
  }

  ngOnInit() {
     this.searchAction();
  }

  onSearch(value:any){
     this.displayProducts = [];
     this.searchAction();
  }

  addToCart(item:any){
   
  }

}
