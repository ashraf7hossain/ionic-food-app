import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private _auth: AuthService,
              private router: Router) { }
  loginForm:FormGroup = new FormGroup({});
  ngOnInit() {
    this.loginForm = new FormGroup({
      lemail: new FormControl('',[Validators.required]),
      lpassword: new FormControl('',[Validators.required])
    })
    this._auth.getAllUsers();
  }
  login(){
    let user = {
      email: this.loginForm.value['lemail'],
      password: this.loginForm.value['lpassword']
    }
    let ret = this._auth.login(user);
    if(ret === undefined){

    }else{
      this.router.navigate(['home']);
    }
  }
  goto(){
    this.router.navigate(['/signup']);
  }

}
