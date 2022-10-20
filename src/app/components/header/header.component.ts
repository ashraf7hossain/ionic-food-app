import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  constructor(private auth: AuthService) { }

  currentUser: any = {}

  ngOnInit() {
    this.auth.currentUser.subscribe(res =>{
      this.currentUser = res;
    });
  }

}
