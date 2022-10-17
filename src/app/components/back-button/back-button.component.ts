import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {

  constructor(private loc: Location) { }

  ngOnInit() {}

  goBack(){
    console.log("back button pressed");
    this.loc.back();
  }

}
