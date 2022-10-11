import { Component } from '@angular/core';
import { AuthorizationService } from 'services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthorizationService,
              private router: Router) {}

  onLogOut(){
      this.auth.deleteToken();
      this.router.navigate(['/login']);

  }
}
