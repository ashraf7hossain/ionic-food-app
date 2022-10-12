import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'services/user-api.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {

  users: any[] = [];

  constructor(private router:Router, private userApi: UserApiService) { }

  ngOnInit() {
      this.userApi.getUsers().subscribe( (response:any)=>{
          this.users = response.data;
      })
  }

}
