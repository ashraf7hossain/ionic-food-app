import { Component,OnInit,AfterViewInit,ElementRef,Renderer2 } from '@angular/core';

import { Camera, CameraResultType } from '@capacitor/camera';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  cartCount: number = 0;
  favCount: number = 0;
  constructor(private auth: AuthService,
              private elm: ElementRef,
              private prd: ProductService,
              private render: Renderer2) { }
  currentUser:any = {};
  ngOnInit(){
    this.auth.currentUser.subscribe(res =>{
      this.currentUser = res;
    });
    this.prd.currentCartCount.subscribe(res => {
      this.cartCount = res;
    })
    this.prd.currentfavCount.subscribe(res => {
      this.favCount = res;
    })
  }
  takePic() {
    let opts = {
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      saveToGallery: true
    }
    Camera.getPhoto(opts).then((res) => {
      // this.src = res.dataUrl;
      // console.log(this.src);
    })
  }
  
}
