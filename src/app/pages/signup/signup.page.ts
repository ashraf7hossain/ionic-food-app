import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { pipe } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signForm : FormGroup = new FormGroup({});
  selected: File ;
  downloadURL: any;
  constructor(private storage: AngularFireStorage,
              private http: HttpClient) { }

  ngOnInit() {
    this.signForm = new FormGroup({
      sname : new FormControl('',[Validators.required]),
      semail : new FormControl('',[Validators.required]),
      spassword : new FormControl('',[Validators.required]),
      svpassword : new FormControl('',[Validators.required]),
    })
  }
  getSelected(event):void{
    this.selected = event.target.files[0];
    
  }
  signUp(){
    const filePath = this.selected['name'];
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,this.selected);

    let userData = {
      name : this.signForm.value['sname'],
      email : this.signForm.value['semail'],
      password : this.signForm.value['spassword'],
      img: ""
    }


    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(res => {
          userData = {...userData , img: res};
          this.http.post(`${environment.baseURL}/users.json`,userData).subscribe(res2 => {
            console.log(res2)
          });
        });
      } )
   )
  .subscribe();
    
  }
  
}
