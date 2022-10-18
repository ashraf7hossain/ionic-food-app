import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {
  fav:any[] = [];
  constructor(private prd : ProductService) { }

  ngOnInit() {
    this.prd.currentFavorite.subscribe(res => {
      this.fav = res;
    });
  }

}
