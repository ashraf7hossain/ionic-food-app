import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  currentUser: any = {};
  mode: string = "moon";

  constructor(private _auth: AuthService, private menu: MenuController,
    private render: Renderer2) { }

  ngOnInit() {
    this._auth.currentUser.subscribe(res => {
      this.currentUser = res;
    });

  }
  logout() {
    this._auth.logout();
  }
  close() {
    this.menu.close();
  }
  changeTheme() {
    if (this.mode === 'moon') {
      this.render.addClass(document.body, 'body2');
      this.mode = 'sunny';
    } else {
      this.mode = 'moon';
      this.render.removeClass(document.body, 'body2');
    }
  }

}
