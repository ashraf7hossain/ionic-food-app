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
  startX:number;
  startY:number;

  movingX:number;
  movingY:number;

  swipestart(e:TouchEvent){
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  }
  swiping(e: TouchEvent){
    this.movingX = e.touches[0].clientX;
    this.movingY = e.touches[0].clientY;
  }
  swipeend(e:TouchEvent, item:any){
    if(this.startX + 100 < this.movingX || this.startX - 100 > this.movingX){
      this.prd.removeFromFav(item);
      return;
    }
  }

}
