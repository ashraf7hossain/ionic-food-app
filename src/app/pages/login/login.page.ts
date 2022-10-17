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

  focused:boolean[] = [];
  wrong:boolean = false;
  
  ngOnInit() {
    this.loginForm = new FormGroup({
      lemail: new FormControl('',[Validators.required]),
      lpassword: new FormControl('',[Validators.required])
    })
    this._auth.getAllUsers();
  }
  login(){
    console.log(this.loginForm);
    let user = {
      email: this.loginForm.value['lemail'],
      password: this.loginForm.value['lpassword']
    }
    let ret = this._auth.login(user);
    if(ret === undefined){
      this.wrong = true;
    }else{
      this.router.navigate(['home']);
    }
  }
  goto(){
    this.router.navigate(['/signup']);
  }
  onFocused(event:any,id:number){
    const val = event.target.value;
    if(!val){
      this.focused[id] = false;
    }
  }

}
