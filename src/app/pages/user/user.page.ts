import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) { }

  currentUser:any = {}

  focused: any[] = [];

  ngOnInit() {
    this.auth.currentUser.subscribe(res => {
      this.currentUser = res;
    });
  }

  onFocused(event:any,id:number){
    const val = event.target.value;
    if(!val){
      this.focused[id] = false;
    }
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['home']);
  }

}
