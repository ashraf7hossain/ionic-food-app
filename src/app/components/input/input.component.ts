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

  focused: boolean;
  heart: string = "heart-outline";

  constructor(private prd : ProductService) { }

  ngOnInit() {}

  onFocused(event:any){
    const val = event.target.value;
    if(!val){
      this.focused = false;
    }
  }
  addToFav(item:any){
    if(this.heart === 'heart-outline'){
      this.heart = 'heart';
    }else{
      this.heart = 'heart-outline';
    }
    this.prd.addToFav(item);
  }

}
