import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  @Input() product: any;
  @Input() type = 'text';
  @Input() icon:string;

  focused: boolean;
  heart: string = "heart-outline";

  constructor(private prd : ProductService) { }
  favs:any[] = [];
  ngOnInit() {
    this.prd.currentFavorite.subscribe(res => {
      this.favs = res;
    })
  }

  onFocused(event:any){
    const val = event.target.value;
    if(!val){
      this.focused = false;
    }
  }
  addToFav(item:any){
    this.prd.addToFav(this.product);
    if(this.favs.includes(this.product)){
      this.heart = "heart";
    }else{
      this.heart = "heart-outline"
    }
  }

}
