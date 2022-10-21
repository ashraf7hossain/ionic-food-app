import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { pipe } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';





@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signForm: FormGroup = new FormGroup({});
  selected: File;
  downloadURL: any;
  mail: string = "";
  validMail: any;
  focused: boolean[] = [];
  loading: any;
  constructor(private storage: AngularFireStorage,
    private http: HttpClient,
    private router: Router,
    private toast: ToastController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.signForm = new FormGroup({
      sname: new FormControl('', [Validators.required]),
      semail: new FormControl('', [Validators.required, Validators.email]),
      spassword: new FormControl('', [Validators.required]),
      svpassword: new FormControl('', [Validators.required]),
    })
  }
  getSelected(event): void {
    this.selected = event.target.files[0];

  }
  get getForm() {
    return this.signForm.controls;
  }

  async presentToast(position: 'top', message) {
    const tst = await this.toast.create({
      message: message,
      duration: 1500,
      position: position
    });
    await tst.present();
  }
  async showLoading(){
    this.loading = await this.loadingCtrl.create({
      message: 'Uploading...',
    });
    this.loading.present();
  }

  signUp() {
    const filePath = this.selected['name'];
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selected);

    let userData = {
      name: this.signForm.value['sname'],
      email: this.signForm.value['semail'],
      password: this.signForm.value['spassword'],
      role: "user",
      status: "active",
      img: ""
    }


    task.snapshotChanges().pipe(
      finalize(async() => {

        await this.showLoading();

        fileRef.getDownloadURL().subscribe(res => {
          userData = { ...userData, img: res };
          this.http.post(`${environment.baseURL}/users.json`, userData).subscribe(async res2 => {
            // this.loading.dismsiss();
            this.loadingCtrl.dismiss();
            await this.presentToast('top', "Sign Up Successfull");
            this.router.navigate(['login']);
          });
        });
      })
    )
      .subscribe();

  }
  onFocused(event: any, id: number) {
    const val = event.target.value;
    if (!val) {
      this.focused[id] = false;
    }
  }

}
