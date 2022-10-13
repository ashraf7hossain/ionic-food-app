import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  params: string = "";
  currentProduct: any = {};

  constructor(private acr: ActivatedRoute,
    private prd: ProductService) { }

  ngOnInit() {
    this.acr.queryParams.subscribe(res => {
      this.params = res['id'];
    });
    this.prd.getAllProducts().subscribe(res => {
      let arr = Object.entries(res);
      let temp:any[] = [];
      for (let [x, y] of arr) {
        temp.push(y);
      }
      this.currentProduct = temp.find(p => p.id === this.params);
      
    })
  }

}
