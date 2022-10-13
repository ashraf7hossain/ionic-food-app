import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  currentUser:any = {};

  constructor(private _auth: AuthService , private menu: MenuController) { }

  ngOnInit() {
    this._auth.currentUser.subscribe(res => {
      this.currentUser = res;
    });
    
  }
  logout(){
    this._auth.logout();
  }
  close(){
    this.menu.close();
  }

}
