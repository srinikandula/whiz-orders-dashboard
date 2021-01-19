import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  toggleDrawer() {
    this.globals.toggleDrawer = !this.globals.toggleDrawer;
  }

  constructor(public globals: ThemeOptions) {
  }
  name;
  role;
  url;
  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.role = localStorage.getItem('role');
    this.url = localStorage.getItem('profileurl');
    if(this.url == 'null'){
      this.url = './assets/images/avatars/sampleimage.png';
    }
  }

}
