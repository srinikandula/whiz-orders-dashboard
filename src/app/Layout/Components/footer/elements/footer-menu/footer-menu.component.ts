import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html'
})
export class FooterMenuComponent implements OnInit {
  date = new Date();
  currentYear: any = new Date();
  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    console.log(this.date);
    this.currentYear = this.datePipe.transform(this.date, 'yyyy');
    console.log(this.currentYear, '=======');
  }

}
