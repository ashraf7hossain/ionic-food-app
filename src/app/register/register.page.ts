import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserApiService } from 'src/app/services/user-api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user:User = {} as User;
  passNotMatched: boolean = false;

  constructor(private router: Router, 
              private userApi: UserApiService) { }

  ngOnInit(): void {
  }

  onSubmit(){
     if( this.user.password != this.user.passConfirm)
     {
        this.passNotMatched = true;
       
        return;
     }
     this.userApi.addUser(this.user).subscribe(  (res)=>{
         this.router.navigate(['/login']);
     } )
  }



}
