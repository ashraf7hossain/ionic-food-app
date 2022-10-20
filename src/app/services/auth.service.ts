import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  users:any[] = [];
  user = new BehaviorSubject<any>({});

  currentUser = this.user.asObservable();
  getAllUsers(){
    this.http.get<any>(`${environment.baseURL}/users.json`).subscribe(res => {
      let arr = Object.entries(res);
      for (let [x, y] of arr) {
        y['id'] = x;
        this.users.push(y);
      }
    });
  }
  registerOrder(order:any){
    this.http.post(`${environment.baseURL}/orders.json`,order).subscribe(res =>{
      console.log(res)
    });
  }
  login(user:any){
    let currentUser = this.users.find(usr => (usr.email === user.email && usr.password === user.password));
    if(currentUser !== undefined){
      this.user.next(currentUser);
    }
    return currentUser;
  }
  logout(){
    this.user.next({});
  }

}
