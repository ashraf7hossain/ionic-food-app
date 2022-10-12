import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserApiService } from 'src/app/services/user-api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { LoggerUser } from '../models/loggerUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: LoggerUser = {} as LoggerUser;
  failedLogin: boolean = false;;
  isDisabled: boolean = false;

  constructor(private router: Router, 
    private userApi: UserApiService,
    private auth: AuthorizationService) { }

  ngOnInit() {
  }

  onSubmit(){

    this.user.strategy = "local";
    this.userApi.logUser(this.user).subscribe(   (response)=>{   
               this.auth.setToken(response["accessToken"]);
               console.log( this.auth.getToken() );
               this.router.navigate(['/home']);
     
    })

  }  

}
