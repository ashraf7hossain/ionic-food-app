import { Component } from '@angular/core';

import { Camera, CameraResultType } from '@capacitor/camera';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() { }
  // src: string = "https://www.supercars.net/blog/wp-content/uploads/2016/04/2009_SSC_UltimateAero1.jpg";
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
