import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  @Input() label: string;
  @Input() type = 'text';

  focused: boolean;

  constructor() { }

  ngOnInit() {}

  onFocused(event:any){
    const val = event.target.value;
    if(!val){
      this.focused = false;
    }
  }

}
